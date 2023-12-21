import qrcode from 'qrcode';
import pkg from 'whatsapp-web.js';
const { Client, MessageMedia } = pkg;

const client = new Client();

let qrCodeUrl;
let isClientReady = false;

client.on('qr', (qr) => {
  generateQRCodeDataUrl(qr)
    .then((dataUrl) => {
      qrCodeUrl = dataUrl;
    })
    .catch((error) => {
      console.error('Error generating QR code:', error);
    });
});

client.on('ready', () => {
  console.log('Client is ready!');
  isClientReady = true; // Set the flag when the client is ready
});

client.initialize();

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
  isClientReady = false
  client.initialize() // this what i was need
});

// Helper function to generate a QR code as a data URL
function generateQRCodeDataUrl(qr) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(qr, (error, dataUrl) => {
      if (error) {
        reject(error);
      } else {
        resolve(dataUrl);
      }
    });
  });
}

console.log(isClientReady, 'ini client ready')

export const getHome = (req, res) => {
  res.render('qr', { qrCodeUrl, isClientReady });
};

export const getForm = (req, res) => {
  res.render('index');
};

export const sendMessage = async (req, res) => {
  const { phone, message } = req.body;
  try {
    let phoneArr = phone.split(',');

    if (phone) {
      console.log(phoneArr.length);

      let counter = 0;

      const intervalId = setInterval(() => {
        if (counter < phoneArr.length) {
          let item = phoneArr[counter];

          if (item.startsWith('0')) {
            item = '62' + item.slice(1) + '@c.us';
          } else if (item.startsWith('62')) {
            item += '@c.us';
          } else {
            item = '62' + item + '@c.us';
          }

          if (message) {
            client.sendMessage(item, message);
            console.log('Message sent to', item);
          }

          counter++;
        } else {
          clearInterval(intervalId); // Stop the interval once all messages are sent
          console.log('All messages sent');
          res.redirect('/form');
        }
      }, 30000); // 30 seconds interval
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const uploadImage = async (req, res) => {
  const { phone, caption } = req.body;
  const file = req.file;
  try {
    let phoneArr = phone.split(',');

    if (file) {
      const media = await MessageMedia.fromFilePath(file.path);

      let counter = 0;

      const intervalId = setInterval(() => {
        if (counter < phoneArr.length) {
          let item = phoneArr[counter];

          if (item.startsWith('0')) {
            item = '62' + item.slice(1) + '@c.us';
          } else if (item.startsWith('62')) {
            item += '@c.us';
          } else {
            item = '62' + item + '@c.us';
          }
          
          client.sendMessage(item, media, { caption: caption });
          console.log('Message media sent to', item);

          counter++;
        } else {
          clearInterval(intervalId); // Stop the interval once all messages are sent
          console.log('All messages sent');
          res.redirect('/form');
        }
      }, 5000); // 30 seconds interval
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah gambar' });
  }
};