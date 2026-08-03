import { createFileRoute } from "@tanstack/react-router";
import { Heart, Package, PackageCheck, Scale, Search, ShoppingCart, Star, Store, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ORDERS, PRODUCTS, PRODUCT_CATEGORIES, QUOTE_REQUESTS, SUPPLIERS, naira } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketplace")({
  head: () => ({
    meta: [
      { title: "HSE Marketplace — SentinelQHSE™" },
      { name: "description", content: "Browse, compare and request quotes for certified PPE, detection equipment, emergency gear and HSE training from approved suppliers." },
      { property: "og:title", content: "HSE Marketplace — SentinelQHSE™" },
      { property: "og:description", content: "Verified PPE, safety equipment and HSE services procurement." },
    ],
  }),
  component: MarketplacePage,
});

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40")} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{value.toFixed(1)}</span>
    </span>
  );
}

function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [supplier, setSupplier] = useState("all");
  const [sort, setSort] = useState("rating");
  const [favorites, setFavorites] = useState<string[]>(["MP-1011"]);
  const [cart, setCart] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  const products = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (supplier === "all" || p.supplier === supplier) &&
        (query === "" ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.supplier.toLowerCase().includes(query.toLowerCase())),
    );
    return [...list].sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : sort === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  }, [query, category, supplier, sort]);

  const toggle = (list: string[], set: (v: string[]) => void, id: string, limit?: number) => {
    if (list.includes(id)) set(list.filter((x) => x !== id));
    else if (limit && list.length >= limit) toast.error(`You can compare up to ${limit} products`);
    else set([...list, id]);
  };

  const compared = PRODUCTS.filter((p) => compare.includes(p.id));

  return (
    <>
      <PageHeader
        title="HSE Marketplace"
        description="Approved suppliers of certified PPE, detection equipment, emergency response gear and accredited HSE training."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success(`${favorites.length} saved items`)}>
              <Heart className="mr-1.5 h-4 w-4" /> Favorites ({favorites.length})
            </Button>
            <Button onClick={() => toast.success(cart.length ? `${cart.length} items in cart` : "Your cart is empty")}>
              <ShoppingCart className="mr-1.5 h-4 w-4" /> Cart ({cart.length})
            </Button>
          </>
        }
      />

      <Tabs defaultValue="browse">
        <TabsList className="flex-wrap">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="compare">Compare ({compare.length})</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Orders & history</TabsTrigger>
          <TabsTrigger value="portal">Supplier portal</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-4">
          <Card className="shadow-card">
            <CardContent className="grid gap-3 pt-5 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search products, suppliers or certifications…"
                  aria-label="Search marketplace"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Category"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger aria-label="Supplier"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All suppliers</SelectItem>
                  {SUPPLIERS.map((s) => (
                    <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger aria-label="Sort"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <p className="mt-4 text-sm text-muted-foreground">{products.length} products across {PRODUCT_CATEGORIES.length} categories</p>

          {products.length === 0 ? (
            <Card className="mt-4 shadow-card">
              <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
                <Package className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">No products match your filters</p>
                <p className="text-xs text-muted-foreground">Try clearing the category or supplier filter.</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => { setQuery(""); setCategory("all"); setSupplier("all"); }}>
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <Card key={p.id} className="flex flex-col shadow-card transition-shadow hover:shadow-lg">
                  <div className="flex h-32 items-center justify-center rounded-t-xl bg-muted/60 text-5xl" role="img" aria-label={p.name}>
                    {p.emoji}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">{p.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mt-1 shrink-0"
                        aria-label={favorites.includes(p.id) ? "Remove from favorites" : "Save to favorites"}
                        onClick={() => toggle(favorites, setFavorites, p.id)}
                      >
                        <Heart className={cn("h-4 w-4", favorites.includes(p.id) && "fill-danger text-danger")} />
                      </Button>
                    </div>
                    <CardDescription>{p.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="secondary">{p.category}</Badge>
                      {p.certifications.map((c) => (
                        <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="font-semibold">{naira(p.price)}</span>
                      <span className="text-xs text-muted-foreground">{p.unit}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Stars value={p.rating} />
                      <span className="text-xs text-muted-foreground">{p.reviews} reviews</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <StatusPill value={p.availability === "In stock" ? "Active" : p.availability === "Low stock" ? "Warning" : "Scheduled"} className="text-[10px]" />
                      <span>{p.availability}</span>
                      <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> {p.delivery}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Supplied by <span className="font-medium text-foreground">{p.supplier}</span></p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => toast.success(`Quote requested for ${p.name}`)}>Request quote</Button>
                      <Button size="sm" variant="outline" onClick={() => { setCart((c) => [...c, p.id]); toast.success("Added to cart"); }}>
                        <ShoppingCart className="mr-1.5 h-4 w-4" /> Add
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toggle(compare, setCompare, p.id, 4)}>
                        <Scale className="mr-1.5 h-4 w-4" /> {compare.includes(p.id) ? "Remove" : "Compare"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => toast.success(`Message sent to ${p.supplier}`)}>Contact supplier</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Product comparison</CardTitle>
              <CardDescription>Compare up to four products side by side before requesting quotations.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              {compared.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-14 text-center">
                  <Scale className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">Nothing to compare yet</p>
                  <p className="text-xs text-muted-foreground">Select "Compare" on any product in the Browse tab.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attribute</TableHead>
                        {compared.map((p) => (
                          <TableHead key={p.id}>{p.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["Supplier", (p: (typeof compared)[number]) => p.supplier],
                        ["Price", (p: (typeof compared)[number]) => `${naira(p.price)} ${p.unit}`],
                        ["Certifications", (p: (typeof compared)[number]) => p.certifications.join(", ")],
                        ["Availability", (p: (typeof compared)[number]) => p.availability],
                        ["Rating", (p: (typeof compared)[number]) => `${p.rating} (${p.reviews})`],
                        ["Delivery", (p: (typeof compared)[number]) => p.delivery],
                      ].map(([label, fn]) => (
                        <TableRow key={label as string}>
                          <TableCell className="font-medium">{label as string}</TableCell>
                          {compared.map((p) => (
                            <TableCell key={p.id}>{(fn as (x: typeof p) => string)(p)}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SUPPLIERS.map((s) => (
              <Card key={s.name} className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Store className="h-4 w-4 text-primary" /> {s.name}
                  </CardTitle>
                  <CardDescription>{s.categories} · {s.country}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Stars value={s.rating} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>On-time delivery</span><span className="font-medium text-foreground">{s.onTime}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Catalogue</span><span className="font-medium text-foreground">{s.products} products</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Approved since</span><span className="font-medium text-foreground">{s.since}</span>
                  </div>
                  {s.verified && <Badge className="bg-primary/12 text-primary">Verified supplier</Badge>}
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success(`Message sent to ${s.name}`)}>
                    Contact supplier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Orders, quotations and purchase history</CardTitle>
              <CardDescription>Track quotations through approval, delivery and closeout.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Placed</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium">{o.id}</TableCell>
                        <TableCell className="max-w-[240px] truncate">{o.product}</TableCell>
                        <TableCell>{o.supplier}</TableCell>
                        <TableCell>{o.qty}</TableCell>
                        <TableCell className="whitespace-nowrap">{naira(o.value)}</TableCell>
                        <TableCell className="whitespace-nowrap">{o.placed}</TableCell>
                        <TableCell className="whitespace-nowrap">{o.eta}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{o.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portal" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Supplier registration</CardTitle>
                <CardDescription>Approved suppliers can list products, manage inventory and respond to buyers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sup-name">Company name</Label>
                    <Input id="sup-name" placeholder="e.g. Delta Safety Supplies Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-rc">Registration number</Label>
                    <Input id="sup-rc" placeholder="RC-0000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-cat">Primary category</Label>
                    <Select defaultValue={PRODUCT_CATEGORIES[0]}>
                      <SelectTrigger id="sup-cat"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-email">Contact email</Label>
                    <Input id="sup-email" type="email" placeholder="sales@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-certs">Certifications held</Label>
                  <Textarea id="sup-certs" rows={3} placeholder="ISO 9001, ISO 45001, SON MANCAP…" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => toast.success("Supplier application submitted for approval")}>Register as supplier</Button>
                  <Button variant="outline" onClick={() => toast.success("Product upload sheet downloaded")}>Upload products</Button>
                  <Button variant="outline" onClick={() => toast.success("Inventory synced")}>Update inventory</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PackageCheck className="h-4 w-4 text-primary" /> Incoming quote requests
                </CardTitle>
                <CardDescription>Respond to buyers and manage orders from the supplier workspace.</CardDescription>
              </CardHeader>
              <CardContent className="divide-y p-0">
                {QUOTE_REQUESTS.map((q) => (
                  <div key={q.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{q.item}</p>
                      <p className="text-xs text-muted-foreground">{q.id} · {q.buyer} · {q.received}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{q.status}</Badge>
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Response sent for ${q.id}`)}>Respond</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
