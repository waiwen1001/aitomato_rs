import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: "ap1",
});

const channel = pusher.subscribe("orders");

channel.bind("test", (data: any) => {
  console.log(data);
});

export default pusher;
