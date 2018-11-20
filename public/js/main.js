  const initialConvo = {
    ice: {
      says: ["Hey there!"],
      reply: [
        { question: "Work Experience", answer: "experience" },
        { question: "Skills", answer: "skills" }
      ]
    }
  };
  
const miss = (chatBot) => {
    chatBot.talk(
        {
            "i-dont-get-it": {
                says: [
                    "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
                ],
                reply: o.convo[o.standingAnswer].reply
            }
        },
        "i-dont-get-it"
    );
};


const chatBot = new Bubbles(
    document.getElementById('chat'),
    'chatBot', {
        inputCallbackFn: function (o) {
            console.log(o);
            if (o && !o.input) {
                miss(chatBot);
            }
            const message = o.input;
            

            fetch(`/api/query/${message}`)
                .then(response => response.json())
                .then(convs => {
                    if (convs) {
                        const conv = {
                            [`${convs.name}`]: {
                                says: convs.says,
                                reply: convs.reply
                            }
                        };
                        console.log(conv);
                        chatBot.talk(conv, `${convs.name}`);
                    } else {
                        chatBot.talk(
                            {
                                "i-dont-get-it": {
                                    says: [
                                        "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
                                    ],
                                    reply: o.convo[o.standingAnswer].reply
                                }
                            },
                            "i-dont-get-it"
                        );
                        return;
                    }
                })
                .catch(err => {
                    console.log('====> err')

                    console.error(err);
                    miss(chatBot);
                });
        }
    }
); 

chatBot.talk(initialConvo);