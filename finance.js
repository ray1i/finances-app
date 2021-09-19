

// the items on the finance list
items = {
    sections: [
        
    ],
    existing_section_names: [], //this makes it easier to check for duplicates,
    total: 0
}

/*
items = {
    sections: [
        {
            name: 'bills',
            items: [
                {
                    name: 'water', 
                    quantity: 1,
                    cost_per: 100,
                },
                {
                    name: 'electricity',
                    quantity: 1,
                    cost_per: 50,
                },
                {
                    name: 'phone',
                    quantity: 1,
                    cost_per: 200,
                },
                {
                    name: 'multiple',
                    quantity: 4,
                    cost_per: 25,
                }
            ],
            total: 450.00,
            existing_item_names: ['water', 'electricity', 'phone', 'multiple']
        },
        {
            name: 'entertainment',
            items: [
                {
                    name: 'geese', 
                    quantity: 1,
                    cost_per: 0,
                },
            ],
            total: 0.00,
            existing_item_names: ['geese']
        }
    ],
    existing_section_names: ['bills', 'entertainment'], //this makes it easier to check for duplicates,
    total: 450.00
}*/

function draw_section(s){
    // this function takes s (which is an element of items.sections) and generates html elements for it

    const sections_element = document.getElementsByClassName('sections')[0]

    // first, creates a div and gives it the class 'section' and an id which is the name of the section
    const section = document.createElement('div');
    section.className = 'section'
    section.id = s.name;

    // next, creates a div, gives it class 'section-header'
    const section_header = document.createElement('div')
    section_header.className = 'section-header';
    // next, creates an h2 element, gives it the class 'section-name' and puts in the name of the section
    const section_name = document.createElement('h2');
    section_name.className = 'section-name';
    section_name.innerHTML = s.name;
    // then adds it to 'section-header'
    section_header.appendChild(section_name)
    
    //next, creates 3 input boxes for creating new items
    const item_input = document.createElement('input')
    item_input.type = 'text';
    item_input.className = 'item-input';
    item_input.placeholder = 'Name'
    section_header.appendChild(item_input)

    const qty_input = document.createElement('input')
    qty_input.type = 'text';
    qty_input.className = 'qty-input';
    qty_input.placeholder = 'Qty'
    section_header.appendChild(qty_input)

    const cost_input = document.createElement('input')
    cost_input.type = 'text';
    cost_input.className = 'cost-input';
    cost_input.placeholder = 'Cost Per'
    section_header.appendChild(cost_input)

    // also, create a button to add the item
    const add_item_button = document.createElement('button')
    add_item_button.className = 'add-item-button'
    add_item_button.onclick = function(){add_item(s.name)}
    add_item_button.innerHTML = 'Add!'
    section_header.appendChild(add_item_button)

    section.appendChild(section_header);

    // next, creates a div with class 'section-items', 
    // goes through the items in the section, creates a div with class 'item' for each,
    // and inserts details appropriately
    const section_items = document.createElement('div')
    section_items.className = 'section-items'
    for (let i of s.items){
        let item = document.createElement('div');
        item.className = 'item';
        
        // add item delete button
        let delete_item_button = document.createElement('button');
        delete_item_button.className = 'delete_item_button';
        delete_item_button.innerHTML = 'X'
        delete_item_button.onclick = function(){delete_item(s.name, i.name)}
        item.appendChild(delete_item_button)

        // add item name
        let item_name = document.createElement('p');
        item_name.className = 'item-name';
        item_name.innerHTML = i.name + ': ' + i.quantity + ' x $' + i.cost_per + ' = $' + i.quantity*i.cost_per;

        item.appendChild(item_name);

        section_items.appendChild(item);
    }
    section.appendChild(section_items)
    
    // next, creates a div with class 'section-footer', which will be where the section-total and delete-section-button will go.
    const section_footer = document.createElement('div')
    section_footer.className = 'section-footer';

    // next, creates a div with class 'section-total', inserts the total of the section
    const section_total = document.createElement('div')
    section_total.className = 'section-total'
    const section_total_text = document.createElement('p')
    section_total_text.innerHTML = 'Total: $' + s.total
    section_total.appendChild(section_total_text)
    section_footer.appendChild(section_total)

    // finally, creates a button with class 'delete-section-button', which onclick deletes the section
    const delete_section_button = document.createElement('button')
    delete_section_button.onclick = function(){delete_section(s.name)}
    delete_section_button.innerHTML = 'X'
    section_footer.appendChild(delete_section_button)

    section.appendChild(section_footer);

    sections_element.appendChild(section);
}

function draw_sections(){
    // this function is loaded as soon as the body of the document loads
    // it draw every section in the 'items' object

    for (let s of items.sections){
        draw_section(s)
    }

    // it also puts in the total of all
    document.getElementsByClassName('total')[0].innerHTML = 'Total: $' + items.total
}

function add_section(){
    // this function adds a section and names it whatever is in the 'entry-input' input

    let name = document.getElementsByClassName('entry-input')[0].value

    // check if there is already a section with that name

    if (items.existing_section_names.includes(name)){
        alert('There is already a section with that name!');
    }
    else {
        items.sections.push({
            name: name,
            items: [],
            total: 0,
            existing_item_names: []
        })
        items.existing_section_names.push(name)
        draw_section(items.sections[items.sections.length - 1])
    }
    
    document.getElementsByClassName('entry-input')[0].value = ''
}

// attempt to have the entry in the search bar add an additional entry - currently not functioning
document.querySelector("entry").addEventListener("click", function() {
    add_section(document.querySelector("entry-input").value);
})

function delete_section(name){
    // this function deletes a section given the name of the section

    let index = items.existing_section_names.indexOf(name);

    // subtract section total from total
    items.total -= items.sections[index].total
    document.getElementsByClassName('total')[0].innerHTML = 'Total: $' + items.total

    items.sections.splice(index, 1)

    var section_element = document.getElementById(name)
    section_element.remove();
}

function add_item(section_name){
    // this function adds an item to a given section

    let index = items.existing_section_names.indexOf(section_name);

    let name = document.getElementsByClassName('item-input')[index].value;
    let qty = document.getElementsByClassName('qty-input')[index].value;
    let cost_per = document.getElementsByClassName('cost-input')[index].value;

    if (items.sections[index].existing_item_names.includes(name)){
        alert('There is already an item with that name!')
    }
    else {
        // add the new item to the items.sections
        items.sections[index].items.push({
            name: name,
            quantity: qty,
            cost_per: cost_per,
        })
        
        // create new item div
        var section_items_element = document.getElementById(section_name).getElementsByClassName('section-items')[0]
        let item = document.createElement('div');
        item.className = 'item';
        
        // add item delete button
        let delete_item_button = document.createElement('button');
        delete_item_button.className = 'delete_item_button';
        delete_item_button.innerHTML = 'X'
        delete_item_button.onclick = function(){delete_item(section_name, name)}
        item.appendChild(delete_item_button)

        // add item name
        let item_name = document.createElement('p');
        item_name.className = 'item-name';
        item_name.innerHTML = name + ': ' + qty + ' x $' + cost_per + ' = $' + qty*cost_per;
    
        item.appendChild(item_name);
    
        section_items_element.appendChild(item);

        items.sections[index].existing_item_names.push(name)

        // add total item price to section total, and total
        items.sections[index].total += qty * cost_per
        items.total += qty * cost_per
        // update totals
        document.getElementsByClassName('section-total')[index].innerHTML = 'Total: $' + items.sections[index].total
        document.getElementsByClassName('total')[0].innerHTML = 'Total: $' + items.total
    }

    document.getElementsByClassName('item-input')[index].value = ''
    document.getElementsByClassName('qty-input')[index].value = ''
    cost_per = document.getElementsByClassName('cost-input')[index].value = ''
}

function delete_item(section_name, name){
    // this function deletes an item from a given section, given the index of the item

    let section_index = items.existing_section_names.indexOf(section_name);
    let index = items.sections[section_index].existing_item_names.indexOf(name);

    // subtract total item price from section total and total
    items.sections[section_index].total -= items.sections[section_index].items[index].quantity * items.sections[section_index].items[index].cost_per
    items.total -= items.sections[section_index].items[index].quantity * items.sections[section_index].items[index].cost_per
    // update document totals
    document.getElementsByClassName('section-total')[section_index].innerHTML = 'Total: $' + items.sections[section_index].total
    document.getElementsByClassName('total')[0].innerHTML = 'Total: $' + items.total

    items.sections[section_index].existing_item_names.splice(index, 1)
    items.sections[section_index].items.splice(index, 1)
    
    var section_item_element = document.getElementById(section_name).getElementsByClassName('section-items')[0].getElementsByClassName('item')[index]

    section_item_element.remove();
}

function export_items(){
    const box = document.getElementsByClassName('export-box')[0]

    box.value = JSON.stringify(items)
}

function import_items(){
    const box = document.getElementsByClassName('import-box')[0]

    items = JSON.parse(box.value)
    draw_sections();
}