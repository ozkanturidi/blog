"use client";

import { DotsHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  IconButton,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchHandler = useDebouncedCallback((query: string) => {
    console.log(query);
    if (query) {
      params.set("title", query);
    } else {
      params.delete("title");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <>
      <Box style={{ alignItems: "center", width: 800 }}>
        <TextFieldRoot>
          <TextFieldSlot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            placeholder="Search the docs…"
            size="2"
            onChange={(e) => searchHandler(e.target.value)}
          />
          <TextFieldSlot>
            <IconButton size="1" variant="ghost">
              <DotsHorizontalIcon height="14" width="14" />
            </IconButton>
          </TextFieldSlot>
        </TextFieldRoot>
      </Box>
    </>
  );
};

export default SearchBar;
