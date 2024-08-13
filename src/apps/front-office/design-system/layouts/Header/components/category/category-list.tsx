import { trans } from "@mongez/localization";
import { current } from "@mongez/react";
import { Link } from "@mongez/react-router";
import { Button } from "apps/front-office/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "apps/front-office/design-system/components/ui/dropdown-menu";
import { Separator } from "apps/front-office/design-system/components/ui/separator";
import { useCategory } from "apps/front-office/design-system/hooks/useCategory";
import { cn } from "apps/front-office/design-system/lib/utils";
import { FiMenu } from "react-icons/fi";

const CategoryLists = () => {
  const currentLanguage = current("localeCode");

  const { data, isLoading, error } = useCategory();

  if (isLoading) {
    return (
      <Button
        variant={"ghost"}
        className={cn(
          "flex items-center justify-start w-full max-w-[270px]",
          "border-slate-200 rounded-none pl-0 hover:bg-transparent",
          currentLanguage === "en" ? "border-r-[2px]" : "border-l-[2px]",
        )}>
        <FiMenu className="w-5 h-5 mx-2" />
        <span className="text-md font-medium text-slate-700">
          {trans("browse")}
        </span>
      </Button>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading cart data.</div>;
  }

  if (data) {
    const { categories } = data;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex items-center justify-start w-full max-w-[270px]",
              "border-slate-200 rounded-none pl-0 hover:bg-transparent",
              currentLanguage === "en" ? "border-r-[2px]" : "border-l-[2px]",
            )}>
            <FiMenu className="w-5 h-5 mx-2" />
            <span className="text-md font-medium text-slate-700">
              {trans("browse")}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-[250px] shadow-none pt-2">
          {categories.map(category => {
            const categoryName =
              category.name.find(name => name.localeCode === currentLanguage)
                ?.value || category.name[0].value;

            return (
              <div key={category.id}>
                <DropdownMenuItem
                  className="text-[14px] cursor-pointer hover:bg-transparent
                py-1 font-normal text-black">
                  <Link href={"#"}>{categoryName}</Link>
                </DropdownMenuItem>
                <Separator className="my-2" />
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
export default CategoryLists;
