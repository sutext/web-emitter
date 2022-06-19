import Emitter, { EventCenter } from ".";
var target = {};
EventCenter.shared.on("test", target, function () {
    console.log(arguments);
});
EventCenter.shared.emit("test", "hehe", "jaj", "1111");
EventCenter.shared.off(target);
EventCenter.shared.emit("test2", "22222");
