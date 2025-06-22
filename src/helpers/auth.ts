// export const setTokenDuration = () => {
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 0.5);
//   localStorage.setItem("expiration", expiration.toISOString());
// };

// export function getTokenDuration() {
//   const storedExpirationDate = localStorage.getItem("expiration");
//   const expirationDate = new Date(storedExpirationDate); //Преобразование строки в объект Date
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }
