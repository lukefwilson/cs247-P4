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

// general template: id, name, age, diagnosisDate, stage, bio, married, kids, location, img, messages, cardBio
db.addUser(new User(1, 'Audrey Allen', 34, '12/2013', 2, 'I live each day to the fullest without fear.', true, 2, 'San Francisco, CA', 'aa-photo.png', ['filler message and good stuff', 'filler message and good stuff', 'filler message and good stuff'],'Audrey lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('First Story Title', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [0, 2, 5], 1));
db.addStory(new Story('Second Story Title', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', [0, 2, 5], 1));
db.addStory(new Story('Third Story Title', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', [0, 2, 5], 1));

db.addUser(new User(2, 'Shawna Bunch', 34, '12/2013', 2, 'This is my bio yo', false, 1, 'Oakland, CA', 'bs-photo.png', ['filler message and good stuff', 'filler message and good stuff', 'Say what!?'],'Shawna lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 2));

db.addUser(new User(3, 'Samantha Stephenson', 34, '12/2013', 2, 'This is my bio yo', true, 2, 'San Francisco, CA', 'ss-photo.png', [], 'Samantha lives in your neighborhood. She is a mother and cares about her family alot.'));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));
db.addStory(new Story('Story Title', 'Some great content', [0, 2, 5], 3));

