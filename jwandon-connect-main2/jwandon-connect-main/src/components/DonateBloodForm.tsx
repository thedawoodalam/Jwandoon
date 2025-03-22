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
import { mapboxgl } from "mapbox-gl";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donateFormSchema = z.object({
  bloodType: z.string({
    required_error: "Please select your blood type",
  }),
  lastDonation: z.string().optional(),
  medicalConditions: z.string().optional(),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  address: z.string().min(5, "Please enter your address"),
  latitude: z.string(),
  longitude: z.string(),
});

type DonateBloodFormValues = z.infer<typeof donateFormSchema>;

interface DonateBloodFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DonateBloodForm = ({ open, onOpenChange }: DonateBloodFormProps) => {
  const [locationStatus, setLocationStatus] = useState<string>("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

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

  const form = useForm<DonateBloodFormValues>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      lastDonation: "",
      medicalConditions: "",
      latitude: "",
      longitude: "",
    },
  });

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

  const onSubmit = (data: DonateBloodFormValues) => {
    console.log("Donation form submitted:", data);
    toast.success("Thank you for registering as a donor!", {
      description: "We will contact you when there is a need for your blood type in your area.",
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register as Blood Donor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Blood Type</FormLabel>
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
              name="lastDonation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Donation Date (if any)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Conditions (if any)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any medical conditions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address..."
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
                {locationStatus || "Detect My Location"}
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

            <Button type="submit" className="w-full">Register as Donor</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
