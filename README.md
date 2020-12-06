## Problem

PayPal Smart Buttons do not come with an amount component.

If you want to display a very simple amount component so that user can enter the amount, then use this component.

# PP Amount

This is a simple Custom Amount component for PayPal Smart Buttons.

## Example Amount

![Amount Component](/screenshots/Amount.png?raw=true "Amount Component")

## Amount in Checkout

![Amount in Checkout](/screenshots/PayPalCheckout.png?raw=true "Amount in Checkout")

### Usage

1. Download the Javascript file from the build folder and include it in your page.

`<script src="../biuld/PPAmount.js"></script>`

2. Create an input field.

`<input id="amount" />`

3. Instantiate PPAmount and pass options. See example in `src/index.html`

```
    window.PPAmount({
      // Any ID
      id: 'amount',
      
      // This will be passed to document.querySelector
      selector: '#amount',

      // These options will be passed to the inputmask component used internally
      // which is https://github.com/RobinHerbots/Inputmask
      // The default options passed are:
      // {
      //   'alias': 'decimal',
      //   'groupSeparator': ',',
      //   'autoGroup': true,
      //   'digits': 2,
      //   'digitsOptional': false,
      //   'placeholder': '0.00'
      // };
      inputMaskOptions: { // 
        ...
      },

      // Valid style options.
      // These will be set as "style" on the input component
      inputStyleOptions: {
        'font-size': '2rem'
      }
    })
```


4. User entered amount will be available as

`window.PPAmount[ID].value`

5. Pass it to PayPal as

```
    <script>
      paypal.Buttons({
        style: {
          size: 'responsive'
        },
        createOrder: function(data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: window.PPAmount['input-amount'].value. // <-- Here
              }
            }]
          });
        }
      }).render('#paypal-button-container');
    </script>
```










