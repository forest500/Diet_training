var Product = {};
var $hiddenMeal = $('.hiddenMeal').html();
Product.activeAjaxConnections = 0;

$(`option[value=${$hiddenMeal}]`).attr('selected', 'selected');
$('#user_food_form_quantity').keyup(getNutrientsOnKeyup);
$('#user_food_form_add').click(checkData);

function getNutrientsOnKeyup(e) {
	e.stopImmediatePropagation();
	$product_quantity = $('#user_food_form_quantity').val();
	product_data = {
		productQuantity: $product_quantity
	};
	if($product_quantity.match(/^[1-9][0-9]{0,5}([\.,][0-9]{1,2})?$/)) {
		setTimeout(addNutrients, 800);
	}
}

function addNutrients() {
	const url = $(location).attr('href');
	return $.ajax({
		beforeSend: function(xhr) {
			Product.activeAjaxConnections++;
			},
		url:  url,
		type: "POST",
		dataType: "json",
		data:
		  product_data,
		success: function(data)
		{
		  	$('#user_food_form_calories').val(data.calories);
		  	$('#user_food_form_totalProtein').val(data.protein);
		  	$('#user_food_form_carbohydrates').val(data.carbohydrates);
		  	$('#user_food_form_fat').val(data.fat);
			$('#user_food_form_productId').val(data.foodId);
			Product.activeAjaxConnections--;
		},
		error: function(jqXHR,  textStatus, errorThrown) {
			Product.activeAjaxConnections--;
			$('form[name="user_food_form"]').submit(function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
			});
		}
	});
}

function checkData(e) {
	let quantity = $('#user_food_form_quantity').val();
	if(Product.activeAjaxConnections != 0)
	{
		$('#error').html('Powolutu... przetwarzam');
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	if(quantity.match(/^[1-9][0-9]{0,5}([\.,][0-9]{1,2})?$/)) {
		return true;
	}
	else {
		$('#error').html('Podaj prawidłową ilość');
		e.preventDefault();
		e.stopImmediatePropagation();
	}
}