"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(call) {
    if (call.req.content.length === 0) {
        call.error('Content is empty');
        return;
    }
    let time = new Date();
    call.succ({
        time: time
    });
}
exports.default = default_1;
