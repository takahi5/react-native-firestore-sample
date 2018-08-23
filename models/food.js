export default class Food {
  // firebaseからのレスポンスから生成
  constructor(doc) {
    const data = doc.data();
    this.id = doc.id;
    this.date = data.date;
    this.name = data.name;
    this.cal = data.cal;
    this.carbohydrate = data.carbohydrate;
    this.lipid = data.lipid;
    this.protein = data.protein;
    this.createdAt = data.createdAt;
  }
}
