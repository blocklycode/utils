# utils
Common components, scripts, etc that are used throughout Blockly Code


## `db`

Can be used to interact with the database.

```js
import { db } from '@blockly/utils';

const user = await db.users.findOne({ email: "example@blocklycode.org" });

console.log(user);

//It isn't the same as mongoose though, e.g.
const new_user = await db.users.createOne({ email: "example@blocklycode.org" });

console.log(new_user);//"6193504e1be4ab27791c8133"

```

`db.[collection].[operation]`

**Operations**

- `findOne`
- `findMany`
- `createOne`
- `createMany`
- `updateOne`
- `updateMany`
- `replaceOne`
- `deleteOne`
- `deleteMany`
- `aggregate`