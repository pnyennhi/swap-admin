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

export const ORDER_STATUS = [
  {
    status: "Chờ tiếp nhận",
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
  { status: "Đã hoàn thành", color: "badge-success" },
  { status: "Đã hủy", color: "badge-danger" },
];

export const CONTACT_STATUS = [
  {
    id: 0,
    status: "Chưa xử lí",
    color: "badge-info-muted",
    nextStep: "Xử lí",
  },
  {
    id: 1,
    status: "Đang xử lí",
    color: "badge-warning",
    nextStep: "Đã xử lí",
  },
  {
    id: 2,
    status: "Đã xử lí",
    color: "badge-success",
  },
];

export const ROUTES = [
  { type: "user", path: "/user", title: "Quản lí người dùng", icon: user },
  { type: "book", path: "/book", title: "Quản lí sách", icon: book },
  {
    type: "category",
    path: "/category",
    title: "Quản lí thể loại",
    icon: category,
  },
  {
    type: "publisher",
    path: "/publisher",
    title: "Quản lí nhà xuất bản",
    icon: publisher,
  },
  {
    type: "coupon",
    path: "/coupon",
    title: "Quản lí mã giảm giá",
    icon: coupon,
  },
  { type: "order", path: "/order", title: "Quản lí đơn hàng", icon: order },
  {
    type: "review",
    path: "/review",
    title: "Quản lí đánh giá",
    icon: review,
  },
  {
    type: "contact",
    path: "/contact",
    title: "Quản lí liên hệ",
    icon: contact,
  },
  {
    type: "shipping",
    path: "/shipping",
    title: "Quản lí phí vận chuyển",
    icon: shipping,
  },
  {
    type: "subscriber",
    path: "/subcriber",
    title: "Quản lí người theo dõi",
    icon: subscribe,
  },
];

export const DASHBOARD = [
  {
    type: "user",
    title: "Total Users",
    background:
      "linear-gradient(to right, rgb(103, 115, 255), rgb(93, 204, 185))",
  },
  {
    type: "subscriber",
    title: "Total Subscribers",
    background:
      "linear-gradient(to right, rgb(188, 228, 66), rgb(255, 204, 44))",
  },
  {
    type: "order",
    title: "Total Orders",
    background:
      "linear-gradient(to right, rgb(255, 168, 117), rgb(251, 72, 72))",
  },
  {
    type: "completed",
    title: "Completed Orders",
    background:
      "linear-gradient(to right, rgb(255, 168, 117), rgb(251, 72, 72))",
  },
  {
    type: "total",
    title: "Total Revenue",
    background:
      "linear-gradient(to right, rgb(255, 168, 117), rgb(251, 72, 72))",
  },
];
