import { useEffect, useState, Fragment } from "react";

import { useChain } from "react-moralis";

import { SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react'

import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logo";

const networkItem = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />,
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
];
export default function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const [selected, setSelected] = useState(networkItem[0]);

  console.log("chain", chain)

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = networkItem.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  return (
      <div className="ml-10">
        <Listbox value={selected} onChange={handleMenuClick}>
        {({ open }) => (
          <div className="relative mt-1">
            <span className="inline-block w-full">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="absolute inset-y-0 flex left-0 pl-2 items-center pointer-events-none">{selected?.icon}</span>
                <span className="">{selected?.value}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            </span>
              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {networkItem.map((network) => (
                    <Listbox.Option
                      key={network.key}
                      
                      className={({ active }) =>
                        `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                            cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={network}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {network.value}
                          </span>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {network.icon}
                          </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? 'text-amber-600' : 'text-amber-600'
                                }
                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                              </span>
                            ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
            </Transition>
          </div>
         )}
        </Listbox> 
      </div>   
    );
}


