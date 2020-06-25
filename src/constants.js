export const ORDER_STATUS = [
  {
    status: "Chưa xử lí",
    color: "badge-info-muted",
    nextStep: "Tiếp nhận",
  },
  {
    status: "Đã tiếp nhận",
    color: "badge-primary",
    nextStep: "Bắt đầu vận chuyển",
  },
  {
    status: "Đang vận chuyển",
    color: "badge-warning",
    nextStep: "Hoàn thành",
  },
  { status: "Hoàn thành", color: "badge-success" },
  { status: "Đã hủy", color: "badge-danger" },
];
