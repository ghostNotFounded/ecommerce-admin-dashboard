"use client";

import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Check,
  ChevronsUpDown,
  PlusIcon,
  Store as StoreIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PopoverContent } from "@radix-ui/react-popover";

type PopverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const [open, setOpen] = useState(false);

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}/${pathname.split("/")[2]}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn(
            "w-[200px] justify-between border-neutral-700 hover:bg-neutral-700 hover:text-white",
            className
          )}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-neutral-950">
          <CommandList>
            <CommandInput
              placeholder="Search store..."
              className="text-white"
            />
            <CommandEmpty>No store found</CommandEmpty>

            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm hover:bg-neutral-800 cursor-pointer"
                >
                  <StoreIcon className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">{store.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      currentStore?.value === store.value
                        ? "oapcity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="bg-neutral-950 cursor-pointer hover:bg-neutral-700"
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusIcon className="mr-2 w-5 h-5 text-white" />
                <span className="text-white">Create store</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
