# utils
Common components, scripts, etc that are used throughout Blockly Code

## Use

#### Step 1: `package.json`

We are using Bun for Blockly Code, so you will add the import like so:

```json
{
  "dependencies": {
    "blockly": "github:blocklycode/utils"
  }
}
```

### Step 2: install

Install using `bun install` or `bun i`

### Step 3: import

```js
import { thing } from 'blockly';

//Ex
import { db } from 'blockly';
import { User} from "blockly/components";
```

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