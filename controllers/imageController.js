
// // import { Client } from 'whatsapp-web.js';
// // import path from 'path'

// // const client = new Client();

// // export const uploadImage = async (req, res) => {
// //     const { phone, caption } = req.body;
// //     const file = req.file;
// //     try {
// //         console.log(phone, caption, 'body')

// //         console.log(file, 'imi file')

// //         let phoneArr = phone.split(',');


// //         if (file) {
// //             const filePathRelativeToUpload = file.filename;
// //             const absoluteFilePath = path.join(__dirname, 'upload', filePathRelativeToUpload);

// //             console.log(absoluteFilePath, 'absolute')
// //             // let media = await MessageMedia.fromFilePath(absoluteFilePath);
// //             console.log(phoneArr.length);

// //             let counter = 0;

// //             const intervalId = setInterval(() => {
// //                 if (counter < phoneArr.length) {
// //                     let item = phoneArr[counter];

// //                     if (item.startsWith('0')) {
// //                         item = '62' + item.slice(1) + '@c.us';
// //                     } else if (item.startsWith('62')) {
// //                         item += '@c.us';
// //                     } else {
// //                         item = '62' + item + '@c.us';
// //                     }
// //                     console.log(item, 'testing item')

// //                     //   if (caption) {
// //                     //     let data = {
// //                     //       "jumlah": item
// //                     //     }
// //                     //     client.sendMessage(item, caption);
// //                     //     res.send(data)
// //                     //     console.log('Message sent to', item);
// //                     //   }

// //                     counter++;
// //                 } else {
// //                     clearInterval(intervalId); // Stop the interval once all messages are sent
// //                     console.log('All messages sent');
// //                     res.redirect('/');
// //                 }
// //             }, 5000); // 30 seconds interval
// //         }

// //         // Lakukan validasi jika perlu

// //         // Kirim respons
// //         // return res.status(200).json({ message: 'Gambar berhasil diunggah', filename: file.filename });
// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah gambar' });
// //     }
// // };

// import pkg from 'whatsapp-web.js';
// const { Client, MessageMedia } = pkg;
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const client = new Client();

// export const uploadImage = async (req, res) => {
//     const { phone, caption } = req.body;
//     const file = req.file;
//     try {
//         console.log(phone, caption, 'body');
//         console.log(file, 'imi file');

//         let phoneArr = phone.split(',');

//         if (file) {
//             const filePathRelativeToUpload = file.filename;
//             const absoluteFilePath = join(__dirname, 'upload', filePathRelativeToUpload);

//             console.log(absoluteFilePath, 'absolute');
//             const media = await MessageMedia.fromFilePath(file.path);
//             // console.log(media, 'ini media')

//             let counter = 0;

//             const intervalId = setInterval(() => {
//                 if (counter < phoneArr.length) {
//                     let item = phoneArr[counter];

//                     if (item.startsWith('0')) {
//                         item = '62' + item.slice(1) + '@c.us';
//                     } else if (item.startsWith('62')) {
//                         item += '@c.us';
//                     } else {
//                         item = '62' + item + '@c.us';
//                     }
//                     console.log(item, 'testing item');
//                     client.sendMessage(item, media);
//                     // Your logic here

//                     counter++;
//                 } else {
//                     clearInterval(intervalId); // Stop the interval once all messages are sent
//                     console.log('All messages sent');
//                     res.redirect('/');
//                 }
//             }, 5000); // 30 seconds interval
//         }

//         // Other logic and validation

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah gambar' });
//     }
// };
