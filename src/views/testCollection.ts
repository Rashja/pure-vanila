export abstract class TestView{

    constructor(public parent:any,public collection:any){};

    // abstract renderItem(Model:any,itemParent:Element):void ;


    render():void{
        this.parent.innerHTML = ''

        const templateElement=document.createElement('template');
        for(let model of this.collection.models){
            const itemParent=document.createElement('div');
            // this.renderItem(model,itemParent);
            
            templateElement.content.append(itemParent)
        }

        this.parent.append(templateElement.content)
    }
}