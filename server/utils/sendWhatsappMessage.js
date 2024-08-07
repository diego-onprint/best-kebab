import axios from "axios"

export const sendWhatsAppMessage = async (to, order) => {
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v20.0/241078029090889/messages',
      {
        messaging_product: "whatsapp",
        to: to,  // Add the recipient's phone number here
        type: "template",
        template: {
          name: "order",
          language: {
            code: "de"
          },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: order },
              ]
            }
          ]
        }
      },
      {
        headers: {
          'Authorization': 'Bearer EAAUSGNjthgQBOZCGkLMk16FfN8azVcIBVNYiU3AmjBBCrE8zXbWmr8BZCcGD5iwAqUjupWB0jmvWWu7uVYNfFauuo76XLIQQCh8ycFExsAnQLNdXILn9vDgB33zmhdFEm9peuCf4O1pIEorZAUWFteo2ZBeCkgEedeOMk5jTFwy3PWNsY5K0ZBJ0I8mIaQUIPZBeIw8ZB5wXmlsLVvfF4i8wBmCWICw',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
};