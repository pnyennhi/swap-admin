import {
  user,
  book,
  category,
  coupon,
  order,
  review,
  contact,
  shipping,
  subscribe,
  publisher,
} from "./components/svg/icon";

export const PRODUCT_STATUS = [
  {
    status: "Chờ duyệt",
    color: "badge-info-muted",
  },
  {
    status: "Đang hoạt động",
    color: "badge-success",
  },
  {
    status: "Bán hết",
    color: "badge-warning",
  },
  { status: "Bị từ chối", color: "badge-primary" },
  { status: "Bị khóa", color: "badge-danger" },
];

export const ORDER_STATUS = [
  {
    status: "Chờ thanh toán",
    color: "badge-secondary",
  },
  {
    status: "Chờ xác nhận",
    color: "badge-info-muted",
    nextStep: "Tiếp nhận",
  },
  {
    status: "Chờ lấy hàng",
    color: "badge-warning",
    nextStep: "Bắt đầu vận chuyển",
  },
  {
    status: "Đang vận chuyển",
    color: "badge-primary",
    nextStep: "Hoàn thành",
  },
  { status: "Đã giao hàng", color: "badge-success" },
  { status: "Đã hủy", color: "badge-danger" },
];

export const CONTACT_STATUS = [
  {
    id: 0,
    status: "Chờ thanh toán",
    color: "badge-info-muted",
  },
  {
    id: 0,
    status: "Chờ xác nhận",
    color: "badge-warning",
  },
  {
    id: 1,
    status: "Chờ lấy hàng",
    color: "badge-warning",
  },
  {
    id: 2,
    status: "Đang vận chuyển",
    color: "badge-primary",
  },
  {
    id: 2,
    status: "Đã giao hàng",
    color: "badge-success",
  },
  {
    id: 2,
    status: "Đã hủy",
    color: "badge-danger",
  },
];

export const ROUTES = [
  { type: "user", path: "/user", title: "Quản lí người dùng", icon: user },
  { type: "book", path: "/book", title: "Quản lí sản phẩm", icon: book },
  {
    type: "verifyProduct",
    path: "/verifyProduct",
    title: "Duyệt sản phẩm",
    icon: book,
  },
  {
    type: "category",
    path: "/category",
    title: "Quản lí thể loại",
    icon: category,
  },
  {
    type: "publisher",
    path: "/publisher",
    title: "Quản lí tình trạng",
    icon: publisher,
  },
  { type: "order", path: "/order", title: "Quản lí đơn hàng", icon: order },
  // {
  //   type: "review",
  //   path: "/review",
  //   title: "Quản lí đánh giá",
  //   icon: review,
  // },
  {
    type: "shipping",
    path: "/shipping",
    title: "Quản lí phí vận chuyển",
    icon: shipping,
  },
];

export const DASHBOARD = [
  {
    type: "user",
    title: "Total Users",
    background:
      "linear-gradient(to right, rgb(103, 115, 255), rgb(84, 206, 239))",
  },
  {
    type: "product",
    title: "Total Subscribers",
    background: "linear-gradient(to right, orange, rgb(255, 204, 44))",
  },
  {
    type: "order",
    title: "Total Orders",
    background:
      "linear-gradient(to right, rgb(135, 60, 154), rgb(222, 164, 207))",
  },
  {
    type: "completedOrder",
    title: "Completed Orders",
    background:
      "linear-gradient(to right, rgb(59, 193, 42), rgb(64, 228, 107))",
  },
  {
    type: "total",
    title: "Total Revenue",
    background:
      "linear-gradient(to right, rgb(255, 168, 117), rgb(251, 72, 72))",
  },
];
