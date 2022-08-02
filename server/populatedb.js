import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/resources/user/user.model.js';
import Message from './src/resources/message/message.model.js';

await mongoose.connect(process.env.DB_URL);

// Test@123
const COMMON_PASSWORD =
  '$2a$10$AavMM60KdTNEacYQI.vWYeOwKVqDimBiAxfU/S3EHxdLd0srJSBfm';

const users = [
  {
    name: 'rahim',
    email: 'rahim@gmail.com',
    password: COMMON_PASSWORD,
    is_member: true,
    is_admin: true,
  },
  {
    name: 'ross',
    email: 'ross@gmail.com',
    password: COMMON_PASSWORD,
    is_member: true,
  },
  {
    name: 'rachel',
    email: 'rachel@gmail.com',
    password: COMMON_PASSWORD,
  },
  {
    name: 'monica',
    email: 'monica@gmail.com',
    password: COMMON_PASSWORD,
  },
  {
    name: 'chandler',
    email: 'chandler@gmail.com',
    password: COMMON_PASSWORD,
  },
  {
    name: 'joey',
    email: 'joey@gmail.com',
    password: COMMON_PASSWORD,
  },
  {
    name: 'phoebe',
    email: 'phoebe@gmail.com',
    password: COMMON_PASSWORD,
  },
];

const createUsers = async () => {
  const promises = [];

  users.forEach((user) => {
    promises.push(User.create({ ...user }));
  });

  return await Promise.all(promises);
};

const createMessages = async (usersArray) => {
  const promises = [];

  usersArray.forEach((user) => {
    const promise = Message.create([
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere pariatur magnam, doloribus dolor earum repellendus? Minus dolor alias, atque sit officia facilis consectetur! Aliquam quia saepe dolor corporis animi laborum autem! Maxime inventore placeat assumenda porro magni saepe ad deleniti.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates ipsam quaerat veritatis. Provident beatae voluptatem assumenda saepe voluptates quae dolorum corrupti accusamus qui! Sint et porro labore, debitis nemo saepe fuga cumque pariatur, dignissimos officia exercitationem odit enim corrupti non.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare, sapien facilisis aliquam pellentesque, neque mi interdum odio, at vehicula sapien dolor vitae neque. Aliquam tempus eleifend luctus. Phasellus elit elit, faucibus sed justo ac, venenatis iaculis arcu. Vivamus at fermentum urna, vel bibendum sapien. Etiam est turpis, tempor eu quam quis, tempus varius enim.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna lorem, fringilla sed dolor vitae, scelerisque pellentesque nulla.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Mauris a orci blandit tellus lobortis cursus sed in lacus. Nunc augue leo, faucibus at enim vel, feugiat viverra arcu. Donec hendrerit ipsum sed velit efficitur vulputate. Quisque finibus interdum eros. Maecenas dapibus felis eget justo bibendum, et.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Phasellus ullamcorper lectus sit amet nulla mattis, at pharetra mauris placerat.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae lacinia neque, nec convallis massa. Donec molestie maximus ornare. Praesent scelerisque porttitor lacus vitae efficitur. Fusce quis mollis odio. Proin ultrices, ante sed consequat facilisis, leo arcu sagittis tellus, ut suscipit sapien sapien eu sapien.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Suspendisse potenti. Vestibulum vitae luctus sem, in porta enim. Curabitur maximus nulla nec metus ultrices congue. Sed ornare pretium nisl at sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vitae risus arcu.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Vestibulum vel orci in ligula molestie imperdiet id in felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Nullam ultrices scelerisque tellus. Quisque at enim sed sem vehicula tristique.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra nisl est, eu blandit turpis hendrerit non. Nam ultrices vitae ipsum vel finibus. Sed fermentum.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Nulla feugiat sollicitudin nibh, sed dignissim ex posuere sed.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Aliquam scelerisque ligula ac ultricies convallis. Praesent bibendum enim lectus, id efficitur massa ullamcorper a. Praesent at ex mattis, sollicitudin est id, porttitor dui.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Suspendisse eu mauris a turpis porta venenatis. Aenean porta ipsum turpis, et lacinia enim dapibus vel. Nunc malesuada ullamcorper est ac volutpat.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Eget nisl laoreet, porta augue aliquet, cursus ante. Ut blandit sed odio mattis viverra. Etiam sit amet metus nisi. In ut rutrum turpis. Ut consectetur.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Ut ullamcorper ultrices, tortor massa gravida arcu, vitae cursus erat sapien ac mi. Aenean vehicula libero arcu, at suscipit velit vestibulum vel. In tempor at augue in ultricies.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Nam aliquam neque sit amet lacus cursus, ut suscipit tellus suscipit. Quisque placerat maximus ligula, at viverra est ullamcorper eget. Nullam cursus molestie dapibus.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Nunc accumsan, est ut porttitor venenatis, quam est ultrices enim, ac sagittis ligula enim in dolor. Phasellus rutrum nisi et erat ornare, ac vestibulum purus tristique.`,
        author: user.id,
      },
      {
        title: `Message ${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
        message: `Donec sed ex pellentesque, dictum leo sollicitudin, blandit neque. Etiam vestibulum magna orci, sed tincidunt mauris euismod et. Etiam ullamcorper sem est, eget fermentum odio convallis et.`,
        author: user.id,
      },
    ]);

    promises.push(promise);
  });

  return await Promise.all(promises);
};

const seedDb = async () => {
  // Drop existing collections
  await mongoose.connection.db.dropCollection('users');
  console.log('Collection users is dropped.');

  await mongoose.connection.db.dropCollection('messages');
  console.log('Collection messages is dropped.');

  const usersArray = await createUsers();
  console.log('Users created');

  await createMessages(usersArray);
  console.log('Messages created.');
};

seedDb().then(() => console.log('Done'));
