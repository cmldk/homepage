import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';

export default function Dropdown({ items }) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (items) {
      const selectedItem = items.find((item) => item.selected);
      setSelected(selectedItem);
    }
  }, [items]);

  return (
    items &&
    selected && (
      <Listbox
        value={selected.value}
        onChange={(value) => {
          const item = items.find((item) => item.value === value);
          setSelected(item);
          if (item['onClick']) {
            item.onClick();
          }
        }}
      >
        <div className="relative">
          <Listbox.Button className="relative text-dark dark:text-light focus:outline-none text-xs select-none">
            <span className="block truncate">
              {selected?.value?.toUpperCase()}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 overflow-hidden rounded-md bg-dark dark:bg-white focus:outline-none text-xs">
              {items.map((item, index) => {
                if (item.value === selected.value) {
                  return null;
                }

                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-1 px-2 text-light dark:text-dark
                     ${active ? '' : ''}`
                    }
                    value={item.value}
                  >
                    <span className={`block truncate`}>
                      {item.value.toUpperCase()}
                    </span>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
  );
}
