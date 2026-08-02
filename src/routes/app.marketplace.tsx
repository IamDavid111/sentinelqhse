import { createFileRoute } from "@tanstack/react-router";
import { HardHat, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/app/marketplace")({
  head: () => ({
    meta: [
      { title: "HSE Marketplace — SentinelQHSE™" },
      { name: "description", content: "Source verified PPE, safety equipment, training and HSE consultancy services." },
      { property: "og:title", content: "HSE Marketplace — SentinelQHSE™" },
      { property: "og:description", content: "Verified PPE, equipment and HSE services." },
    ],
  }),
  component: MarketplacePage,
});

const ITEMS = [
  ["Flame-Resistant Coveralls", "PPE", "Arc-rated FR clothing, NFPA 2112 certified"],
  ["4-Gas Portable Detector", "Detection", "H₂S, CO, O₂, LEL with datalogging"],
  ["Fall Arrest Harness Kit", "Working at Height", "Full-body harness with shock-absorbing lanyard"],
  ["Confined Space Entry Training", "Training", "Accredited 2-day course, on-site delivery"],
  ["Process Safety Consultancy", "Services", "HAZOP facilitation and LOPA studies"],
  ["Spill Response Kit (240L)", "Environment", "Hydrocarbon absorbents and containment booms"],
];

function MarketplacePage() {
  return (
    <>
      <PageHeader
        title="HSE Marketplace"
        description="Verified suppliers of PPE, detection equipment, training and specialist HSE services."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ITEMS.map(([name, cat, desc]) => (
          <Card key={name} className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <HardHat className="h-4 w-4 text-primary" /> {name}
                </CardTitle>
                <Badge variant="secondary">{cat}</Badge>
              </div>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" onClick={() => toast.success("Quote requested")}>
                <ShoppingBag className="mr-1.5 h-4 w-4" /> Request quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
