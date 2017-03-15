// When using this, you probably just want to call: db.users
// This will return an array of all the users (not including yourself)
// All users have a bunch of info, as well as a list of stories: db.users[0].stories
// Each story has a bunch of info too.

var db = {
  users: [],
  stories: [],
  addUser: function(user) {
             this.users.push(user);
           },
  addStory: function(story) {
              for (var i = 0; i < this.users.length; i++) {
                var user = this.users[i];

                if (user.id == story.user_id) {
                  user.stories = [story].concat(user.stories);
                  story.user = user;
                }
              }

              this.stories.push(story);
            },
  getUserByFirstName: function(firstName) {
                          for (var i = 0; i < this.users.length; i++) {
                            var user = this.users[i];

                            if (user.firstName.toLowerCase() == firstName.toLowerCase()) {
                              return user;
                            }
                          }

                          return false;
                      }
}

function User(id, name, age, diagnosisDate, stage, bio, married, kids, location, img, messages, cardBio) {
    this.id = id;
    this.fullName = name;
    this.firstName = name.split(' ')[0];
    this.lastName = name.split(' ')[1];
    this.age = age;
    this.diagnosisDate = diagnosisDate;
    this.stage = stage;
    this.bio = bio;
    this.married = married;
    this.kids = kids;
    this.location = location;
    this.stories = [];
    this.img = img;
    this.messages = messages || [];
    this.cardBio = cardBio;
}

function Story(title, content, date, user_id) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.user_id = user_id;
    this.user = undefined;
}

// general template: id, name, age, diagnosisDate, stage, bio, married, kids, location, img, messages, cardBio
db.addUser(new User(1, 'Audrey Allen', 39, 'November, 2016', 2, 'My life is all about my family.', true, 1, 'San Francisco, CA', 'aa-photo.png', [],'Audrey lives in your neighborhood. She is a single mother battle breast cancer like you.'));
db.addStory(new Story('Devastating News', 'I just found that I am having cancer. I am only 48! I think I am healthy, how could this happen to me! My mind went blank, I felt so scared, and now I am numb on it.', 'November 14, 2016', 1));
db.addStory(new Story('Removed My Tumor', 'I found a surgeon near my home several days ago. I got my tumors removed yesterday.', 'November 18, 2016', 1));
db.addStory(new Story('Doctors are Terrible!', "I consulted with a local oncologist and radiologist today. They were so impersonal! They didn't want to listen to a word I was saying. They wanted to put me in one of those cookie-cutter scenarios. There were no other options for me. They just wanted to cut, radiate and do the chemo. I felt with the way they were conducting business. I had to get a second opinion.", 'November 19, 2016', 1));
db.addStory(new Story('Found a Better Place', "My friend recommended me to a cancer treatment center. The morning after we arrived at the center, they started the process of evaluation. They were really open to talk.", 'November 30, 2016', 1));
db.addStory(new Story('Removed My Ovaries', "The doctor told me that I am pre-menopausal. My medical oncologist felt it critical to stop the hormone that was manifesting the cancer because my cancer was related to hormones. So I had a surgery that removed my ovaries yesterday. I am going to receive Arimidex, a hormone therapy drug, in addition to breast cancer radiation... Merry Christmas to me!", 'December 20, 2016', 1));






db.addUser(new User(2, 'Shawna Bunch', 30, 'October 2016', 1, 'It is a blessing to spend time with my family.', true, 2, 'San Francisco, CA', 'bs-photo.png', ['filler message and good stuff', 'filler message and good stuff', 'I totally agree. It\'s tough'], 'Samantha lives in your neighborhood. She was diagnosed around the same time as you.'));
db.addStory(new Story('Terrible Vacation', "This could be the worst vacation I've ever had in my life ... I noticed bloody discharge coming from my left breast when I was doing laundry, and I could feel a mass there. I called my doctor immediately, who referred me for a mammogram at a nearby women’s health center. Let's see what they'll say next week.", 'September 25, 2016', 2));
db.addStory(new Story('Not Too Bad', "I took the mammogram, and the specialists there decided to do an ultrasound. But they didn’t see anything on the image. They thought I had ductal carcinoma in situ, also referred to as stage 0 breast cancer.", 'October 1, 2016', 2));
db.addStory(new Story('Removed Tumor', "I went to the hospital near our home and had the surgery two days ago. The surgeon could see that the tumor was larger than was initially suspected; it was about 4 millimeters. In addition, there were blockages in several ducts. Maybe it is better to have a full mastectomy of my left breast right now. I heard that breast can be reconstructed afterwards. I am ok with that.", 'October 10, 2016', 2));
db.addStory(new Story('Discussing Treatment', "It's been six weeks from my recovery. I have been meeting with oncologists about further treatment these days. So far I have met with three doctors,  and plan to meet another doctor tomorrow. They each had a different opinion about my next steps. Treatment guidelines generally start at tumors measuring 5 millimeters, and mine was smaller than that, but still significant enough to measure.", 'December 2, 2016', 2));
db.addStory(new Story('Chemo is Terrible!', "I chose an oncologist to work with. That might be a really bad choice. I started my first round of chemotherapy five days ago. But the treatment had really strong side effects! I've having trouble sleeping and severe mood swings. I am also very nauseous right now. I can't understand why this is happening to me! So far I see no hope to get rid of those side effects, and I wasn’t sure I could continue on that path.", 'December 10, 2016', 2));












db.addUser(new User(3, 'Samantha Stephenson', 30, 'November 2016', 2, 'Cancer has taught me the different languages of love; that each person “speaks” their love differently.', true, 1, 'Oakland, CA', 'ss-photo.png', ['filler message and good stuff', 'filler message and good stuff', 'Say what!?'],'Samantha lives in your neighborhood. She is a mother and also has stage 2 breast cancer.'));
db.addStory(new Story('A Little Awkward Feeling?', 'It felt like a lump when I was sitting on a couch during the birthday party for my younger sister yesterday. I have made an appointment with my gynecologist, but I am not too concerned. I always made sure to go for annual check-ups. I’m 30 years old and many women my age develop cysts.', 'October 15, 2016', 3));
db.addStory(new Story('Should I Remove the Lump?', 'The initial ultrasound was unclear. I went to see a general surgeon for a second opinion this morning, and he recommended that I have the lump removed. Still weighing this opinion on myself.', 'October 20, 2016', 3));
db.addStory(new Story("It's Actually a Cancer?", "I received a call from the surgeon during the work yesterday. He asked me to call him and said that I should have him paged if he wasn’t available. The message is alarming. Over the phone, he told me that the lump he’d removed was malignant. I had to clarify what he meant: Was it cancer? When he said the words, “I’m so sorry,” I knew it was cancer. The diagnosis is a really a huge shock. I am going to tell my family tonight but I don't know how they will react ...", 'November 3, 2016', 3));
db.addStory(new Story("My Dear Husband", "My long-term boyfriend, Kyle, after hearing the diagnosis, asked me to marry him. We plan to finish our wedding in about a month so I wouldn’t have a port in our wedding photos.", 'November 4, 2016', 3));
db.addStory(new Story("Painful Chemo", "My oncologist suggested me a treatment plan to finish about 16 rounds of chemotherapy, and then have a surgery to remove lymph nodes and tumor margins. I am now one round into the chemo. The side effects have been strong sometimes, but I have received a lot of help with managing problems in the center.", 'December 4, 2016', 3));

