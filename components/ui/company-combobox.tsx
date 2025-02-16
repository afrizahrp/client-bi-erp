"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const companies = [
  {
    value: "bis",
    label: "Bumi Indah Saranamedis",
  },
  {
    value: "bis",
    label: "Bumi Indah Putra",
  },
  {
    value: "bis",
    label: "Karoseri",
  },
];

interface CompanyComboboxProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CompanyCombobox: React.FC<CompanyComboboxProps> = ({ className, value, onChange ,disabled}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between w-full", className)}
        >
          {value
            ? companies.find((company) => company.value === value)?.label
            : "Select a company..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search a company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {companies.map((company) => (
              <CommandItem
                key={company.value}
                value={company.value}
                disabled={disabled}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === company.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanyCombobox;