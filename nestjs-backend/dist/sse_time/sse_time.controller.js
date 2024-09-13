"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseTimeController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("axios");
let SseTimeController = class SseTimeController {
    async sse() {
        const subject = new rxjs_1.Subject();
        const response = await (0, axios_1.default)({
            method: 'get',
            url: 'http://127.0.0.1:8000/sse_time',
            responseType: 'stream',
        });
        response.data.on('data', (chunk) => {
            const data = chunk.toString();
            const lines = data.split('\n').filter((line) => line.startsWith('data:'));
            const message = lines.map((line) => line.replace(/^data:\s*/, '')).join('\n');
            if (message) {
                subject.next({ data: message });
            }
        });
        response.data.on('end', () => {
            subject.complete();
        });
        response.data.on('error', (err) => {
            subject.error(err);
        });
        return subject.asObservable();
    }
};
exports.SseTimeController = SseTimeController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Sse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SseTimeController.prototype, "sse", null);
exports.SseTimeController = SseTimeController = __decorate([
    (0, common_1.Controller)('sse-time')
], SseTimeController);
//# sourceMappingURL=sse_time.controller.js.map