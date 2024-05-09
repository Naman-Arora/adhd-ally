import { SearchIcon } from "lucide-react";
import { type InputHTMLAttributes, forwardRef } from "react";

export type SearchProps = InputHTMLAttributes<HTMLInputElement>;

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={
          "[&:has(:focus-visible)]:ring-ring flex items-center p-0 [&:has(:focus-visible)]:ring-2 rounded-md border border-input"
        }
      >
        <span className="sr-only">Search</span>

        <SearchIcon className="size-4 ml-2" />
        <input
          ref={ref}
          type="search"
          placeholder="Search"
          className="size-full pl-2 rounded-md border-none focus:outline-none focus-visible:ring-0 p-2 placeholder:text-muted-foreground"
          {...props}
        />
      </label>
    );
  }
);

Search.displayName = "Search";

export default Search;
