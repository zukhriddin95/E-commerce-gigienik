interface PaginationType {
  total: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default PaginationType;
