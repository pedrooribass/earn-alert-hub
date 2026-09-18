import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Offer } from "@/lib/opportunities";

export function VerificationStatus({ verification }: { verification: Offer["verification"] }) {
  if (!verification) return <p className="trust-label trust-label-unverified">Ainda não verificámos</p>;

  return <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className="trust-label trust-label-button h-auto p-0">Verificada {verification.verifiedAt}</Button>
    </PopoverTrigger>
    <PopoverContent align="start" className="text-xs leading-5">
      <p>Testámos este fluxo a {verification.verifiedAt} e confirmámos o pagamento.</p>
      <p className="mt-2">Método: {verification.method}.</p>
    </PopoverContent>
  </Popover>;
}