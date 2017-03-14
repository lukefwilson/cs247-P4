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
                  user.stories.push(story);
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

function Story(title, content, tags, user_id) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.user_id = user_id;
    this.user = undefined;
}

db.addUser(new User(1, 'Audrey Allen', 34, '12/2013', 2, 'This is my bio yo', true, 2, 'San Francisco, CA', 'aa-photo.png', ['filler message and good stuff', 'filler message and good stuff', 'filler message and good stuff'],'Audrey lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 1));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 1));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 1));

db.addUser(new User(2, 'Shawna Bunch', 34, '12/2013', 2, 'This is my bio yo', true, 2, 'San Francisco, CA', 'bunch-shawna.jpg', ['filler message and good stuff', 'filler message and good stuff', 'Say what!?'],'Shawna lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));

db.addUser(new User(3, 'Samantha Stephenson', 34, '12/2013', 2, 'This is my bio yo', true, 2, 'San Francisco, CA', 'stephenson-samantha.jpg', [], 'Samantha lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));

