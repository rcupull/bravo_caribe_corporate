import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MapOl } from "../ui/map";

interface MapAndHoursProps {
  address?: string;
  phone?: string;
  email?: string;
  hours?: Array<{ days: string; time: string }>;
  mapEmbedUrl?: string;
}

const defaultHours = [
  { days: "Lunes - Viernes", time: "8:00 AM - 6:00 PM" },
  { days: "Sábado", time: "9:00 AM - 2:00 PM" },
  { days: "Domingo", time: "Cerrado" },
];

const MapAndHours = ({
  address = "Calle Principal #123, Ciudad, País",
  phone = "(123) 456-7890",
  email = "info@bravocaribe.com",
  hours = defaultHours,
  mapEmbedUrl,
}: MapAndHoursProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Información de Contacto
          </h3>

          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-start p-6">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Dirección
                  </h4>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Teléfono
                  </h4>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Horario de Atención
          </h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground">Horarios</h4>
              </div>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground font-medium">
                      {schedule.days}
                    </span>
                    <span className="text-foreground font-semibold">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Ubicación</h3>

        <MapOl
          center={{
            lat: 23.133455339265353,
            lon: -82.37645038781906,
          }}
          markers={[
            {
              lat: 23.133455339265353,
              lon: -82.37645038781906,
            },
          ]}
          zoom={18}
        />
      </div>
    </div>
  );
};

export default MapAndHours;
