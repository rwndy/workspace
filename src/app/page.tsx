import {
  Header,
  WorkspacePreview,
  ProductCatalog,
  PresetBar,
  DurationSelector,
  PriceBar,
  CheckoutOverlay,
} from "@/components/workspace";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sand">
      <Header />

      <main className="max-w-310 mx-auto px-5 py-5 pb-36">
        <div className="flex gap-5 flex-wrap lg:flex-nowrap">
          {/* LEFT — Visual Preview + Controls */}
          <div className="flex-1 min-w-[320px] flex flex-col gap-4">
            <WorkspacePreview />
            <PresetBar />
            <DurationSelector />
          </div>

          {/* RIGHT — Product Catalog */}
          <div className="w-full lg:w-95 xl:w-100 shrink-0">
            <ProductCatalog />
          </div>
        </div>
      </main>

      <PriceBar />
      <CheckoutOverlay />
    </div>
  );
}
