import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const requestFormSchema = z.object({
  bloodType: z.string({
    required_error: "Please select a blood type",
  }),
  unitsNeeded: z.string().min(1, "Units needed is required"),
  urgency: z.string({
    required_error: "Please select urgency level",
  }),
  hospitalName: z.string().min(2, "Hospital name is required"),
  additionalNotes: z.string().optional(),
  latitude: z.string(),
  longitude: z.string(),
  searchRadius: z.string().min(1, "Search radius is required"),
});

type RequestBloodFormValues = z.infer<typeof requestFormSchema>;

interface RequestBloodFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RequestBloodForm = ({ open, onOpenChange }: RequestBloodFormProps) => {
  const [locationStatus, setLocationStatus] = useState<string>("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const form = useForm<RequestBloodFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      unitsNeeded: "1",
      additionalNotes: "",
      latitude: "",
      longitude: "",
      searchRadius: "5",
    },
  });

  useEffect(() => {
    if (!mapContainer.current || !open) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, [open]);

  const getUserLocation = () => {
    setLocationStatus("Getting location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setValue("latitude", latitude.toString());
          form.setValue("longitude", longitude.toString());
          setLocationStatus("Location detected");
          
          if (map.current) {
            map.current.setCenter([longitude, latitude]);
            
            if (marker.current) {
              marker.current.remove();
            }
            
            marker.current = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map.current);

            // Add a circle to represent search radius
            const radius = parseInt(form.getValues("searchRadius"), 10);
            map.current.addSource('radius', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude]
                },
                properties: {}
              }
            });

            map.current.addLayer({
              id: 'radius-circle',
              type: 'circle',
              source: 'radius',
              paint: {
                'circle-radius': radius * 100,
                'circle-color': '#ff0000',
                'circle-opacity': 0.2
              }
            });
          }

          toast.success("Location detected successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus("Error getting location");
          toast.error("Could not get your location. Please try again.");
        }
      );
    } else {
      setLocationStatus("Geolocation not supported");
      toast.error("Your browser doesn't support location services.");
    }
  };

  const onSubmit = (data: RequestBloodFormValues) => {
    const unitsNeeded = parseInt(data.unitsNeeded, 10);
    const searchRadius = parseInt(data.searchRadius, 10);
    
    if (unitsNeeded < 1 || unitsNeeded > 10) {
      form.setError("unitsNeeded", {
        type: "manual",
        message: "Units must be between 1 and 10",
      });
      return;
    }

    if (searchRadius < 1 || searchRadius > 10) {
      form.setError("searchRadius", {
        type: "manual",
        message: "Search radius must be between 1 and 10 kilometers",
      });
      return;
    }

    // Mock donor locations for demonstration
    const mockDonors = [
      { lat: parseFloat(data.latitude) + 0.01, lng: parseFloat(data.longitude) + 0.01, bloodType: data.bloodType },
      { lat: parseFloat(data.latitude) - 0.01, lng: parseFloat(data.longitude) - 0.01, bloodType: data.bloodType },
    ];

    // Add donor markers to map
    mockDonors.forEach(donor => {
      if (map.current) {
        new mapboxgl.Marker({ color: '#00ff00' })
          .setLngLat([donor.lng, donor.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`Available donor: ${donor.bloodType}`))
          .addTo(map.current);
      }
    });

    console.log("Blood request submitted:", { ...data, unitsNeeded, searchRadius });
    toast.success("Blood request submitted successfully!", {
      description: `Found ${mockDonors.length} potential donors within ${searchRadius}km of ${data.hospitalName}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request Blood</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodGroups.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unitsNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units Needed</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (Within 24 hours)</SelectItem>
                          <SelectItem value="urgent">Urgent (2-3 days)</SelectItem>
                          <SelectItem value="scheduled">Scheduled (Within a week)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hospitalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hospital name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={getUserLocation}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {locationStatus || "Detect Hospital Location"}
                  </Button>
                  
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <Input type="hidden" {...field} />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <Input type="hidden" {...field} />
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="searchRadius"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search Radius (km)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="h-[400px] rounded-lg overflow-hidden">
                <div ref={mapContainer} className="w-full h-full" />
              </div>
            </div>

            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
