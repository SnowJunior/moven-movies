import React from "react";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { PageProps } from "@/model/components";

export default function PaginationComponent({
  page,
}: Readonly<{ page: PageProps }>) {
  return (
    <div className="flex flex-row gap-5">
      <div className="flex gap-2">
        <Button
          disabled={page.onPreviousDisabled}
          color="default"
          size="lg"
          variant="flat"
          onPress={page.onPrevious}
        >
          Previous
        </Button>
        <Pagination
          color="primary"
          size="lg"
          page={page.onPage}
          total={page.pages}
          onChange={page.goToPage}
        />
        <Button
          disabled={page.onNextDisabled}
          color="default"
          size="lg"
          variant="flat"
          onPress={page.onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
