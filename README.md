# Event Emitter

-   light weight implemention for notification center

## Usage

-   npm i @sutext/emitter

## Example

```ts
import Emitter, { EventCenter } from "@sutext/emitter";
var target = {};
EventCenter.shared.on("test", target, function () {
    console.log(arguments);
});
EventCenter.shared.emit("test", "hehe", "jaj", "1111");
EventCenter.shared.off(target);
EventCenter.shared.emit("test2", "22222");
```
