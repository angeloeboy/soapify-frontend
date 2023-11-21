// import { createContext, useState } from "react";

// //create notification context
// export const NotificationsContext = createContext(null);

// //create notification provider

// export const NotificationsProvider = ({ children }) => {
// 	const [notifications, setnotifications] = useState([]); // `notifications` is an array of objects

// 	// const getNotificationsFunc = async () => {
// 	// 	const res = await getNotifications();
// 	// 	setnotifications(res.notifications);
// 	// 	console.log(res.notifications);
// 	// };

// 	// useEffect(() => {
// 	// 	getNotificationsFunc();
// 	// }, []);

// 	return <NotificationsContext.Provider value={(notifications, setnotifications)}>{children}</NotificationsContext.Provider>;
// };
