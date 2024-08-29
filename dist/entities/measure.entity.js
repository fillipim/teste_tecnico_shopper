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
exports.Measure = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
let Measure = class Measure {
};
exports.Measure = Measure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Measure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.measures),
    (0, typeorm_1.JoinColumn)({ name: "customerCode" }),
    __metadata("design:type", customer_entity_1.Customer)
], Measure.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Measure.prototype, "measureDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["WATER", "GAS"],
    }),
    __metadata("design:type", String)
], Measure.prototype, "measureType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Measure.prototype, "measureValue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Measure.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Measure.prototype, "hasConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Measure.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Measure.prototype, "confirmedAt", void 0);
exports.Measure = Measure = __decorate([
    (0, typeorm_1.Entity)("Measure")
], Measure);
