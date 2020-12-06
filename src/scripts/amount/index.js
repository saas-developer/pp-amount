import Inputmask from "inputmask";

// window.PPAmount = {};

const defaultInputMaskOptions = {
  'alias': 'decimal',
  'groupSeparator': ',',
  'autoGroup': true,
  'digits': 2,
  'digitsOptional': false,
  'placeholder': '0.00'
};

const defaultInputStyleOptions = {
  'font-size': '3rem',
  border: 'none'
};

export default class PPAmount {
  constructor(props) {
    const {
      id,
      selector,
      inputMaskOptions,
      inputStyleOptions,
      onChange
    } = props;
    this.amountInputComponent = null;

    this.id = id;
    this.selector = selector;
    this.onChange = onChange;

    this.inputMaskOptions = Object.assign({}, defaultInputMaskOptions, inputMaskOptions || {});
    this.inputStyleOptions = Object.assign({}, defaultInputStyleOptions, inputStyleOptions);

    this.changeEventListener = (event) => {
      if (this.onChange) {
        this.onChange(event);
      }
      window.PPAmount[id].value = event.target.value;
      this.resizeInput(event.target.value);
    };

    this.createAmount();
  }

  resizeInput(value) {
    try {
      this.setStyle(this.amountInputComponent, {
        width: value.length + "ch"
      });
    } catch (e) {
      console.log('e ', e);
    }
  }

  createAmount() {
    this.amountInputComponent = document.getElementById(this.id);
    this.setStyle(this.amountInputComponent, this.inputStyleOptions);
    
    window.PPAmount[this.id] = {};

    this.amountInputComponent.addEventListener("input", this.changeEventListener);
    this.amountInputComponent.addEventListener("propertychange", this.changeEventListener);

    Inputmask(this.inputMaskOptions).mask(this.amountInputComponent);
    this.resizeInput(this.inputMaskOptions.placeholder || '0.00');
  }

  destroy() {
    var amount = document.getElementById(this.id);
    if (amount) {
      amount.removeEventListener("input", this.changeEventListener);
      amount.removeEventListener("propertychange", this.changeEventListener);
    }
  }

  setStyle(amount, options = {}) {
    const style = options;
    const keys = Object.keys(style);
    for (var i = keys.length - 1; i >= 0; i--) {
      var key = keys[i];
      amount.style[key] = style[key];;
    }
  }
}
