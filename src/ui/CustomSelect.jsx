import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import clsx from "clsx";

export default function CustomSelect({ label, options, selected, onChange }) {
  return (
    <div className={`mb-0 w-full`}>
      <label className="mb-1 block font-medium md:text-xs">{label}</label>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-left focus:ring-1 focus:ring-emerald-300 focus:outline-none">
            <span>{selected?.label || `${label}`}</span>
            <HiChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-400" />
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-100 focus:outline-none">
            {options?.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt}
                className={({ focus }) =>
                  clsx(
                    "cursor-pointer px-4 py-2 select-none",
                    focus ? "bg-gray-200 text-emerald-700" : "text-gray-700",
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {selected && (
                      <HiCheck className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
