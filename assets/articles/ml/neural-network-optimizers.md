# Neural Network Optimizers
## Optimizers

Different methods of calculating the minimum of a n dimensional function.

These methods have a set learning rate which defines how fast they learn.

Higher learning rate more of a risk of non convergence and not finding global minimum.

All these methods are behave differently and you can choose it based on your situation though Adam is most commonly used.
[Wiki on optimizers](https://en.m.wikipedia.org/wiki/Stochastic_gradient_descent)


#### Stochastic
- Moves parameters based on just the slope 

#### Momentum
- Moves parameters based on slope and adds that to a sort of velocity similar to physics

#### Nag  
- Steer the direction of the momentum of parameters to have a more linear route

#### Adam 
- Automatically configures learning rate of each dimension to find min faster