import { trans } from "@mongez/localization";
import { Button } from "apps/front-office/design-system/components/ui/button";
import { Input } from "apps/front-office/design-system/components/ui/input";
import { ChangeEvent, useState } from "react";
import { cn } from "../../../lib/utils";
import CategoryMenu from "./category-menu";
import SearchResult from "./search-result";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const storeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const selectCategory = (category: string) => {
    setValue(category);
  };

  return (
    <div className="flex items-center gap-2 w-full relative">
      <div className="absolute left-0 hidden xl:block w-full max-w-[200px]">
        <CategoryMenu selectCategory={selectCategory} />
      </div>
      <Input
        placeholder={trans("searchInputPlaceholder")}
        className="border outline-none focus:outline-none focus-visible:ring-0
             focus:ring-0 focus:ring-offset-0 inset-y-0 w-full xl:pl-52 pr-28 h-12"
        onChange={storeInputValue}
        type="search"
        value={value}
      />
      <Button variant={"primary"} size={"lg"} className="absolute right-0">
        {trans("searchBtn")}
      </Button>
      <div
        className={cn(
          "absolute top-full left-0 w-full border border-slate-200 z-50 ",
          value === "" && "hidden",
        )}>
        <SearchResult value={value} />
      </div>
    </div>
  );
};

export default SearchInput;
