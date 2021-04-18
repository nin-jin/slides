Deconstruction of abbreviations
Hello! My name is Dmitry Karlovsky. Now you are watching the Core Dump channel, here we take different topics from computer science and deconstruct its.
TDD SRP OCP LSP ISP DIP SOLID DRY KISS
You can read this as an article or open it as a presentation.
Deconstruction of TDD
Let’s start with test-driven development. You can watch the video about this section there.
Test Driven Development
The essence of this approach is ritualization  of the developing process. That is, in the uncritical unconditional execution of certain simple actions.
This ritual will make your code good-looking and valid. Its maintenance will be easy and simple. And the development will be simple and fast. So at least, TDD proponents persuade us strongly.
The essence of TDD
In short, the ritual cycle consists of 3 steps: at the first, we write a red test, then we write or correct a code so that the test becomes green, and finally,  the code is being refactored, keeping the greenness of the tests.
And then a million-dollar question immediately appears...
What should we do when the test is initially green?
Answer options...
❓ Break the code
❓ Delete the test
❓ This is impossible
If we break the code, the tests will naturally turn red. And after we roll the changes back, the tests will turn green again.
You can delete the test. Because If there is no test, then there is no problem with its original color.
And finally, my favorite option: according to TDD, it should not be.  You have made mistakes if it happened. Repent, sinner!
And now, please, be attentive and see the right answer: all of these options are complete nonsense. Although, you usually hear some of those from the TDD adepts.
The Raven Paradox
Speaking about breaking the code, it is impossible not to mention the Raven Paradox. The essence of this paradox consists of the question "Are all ravens black or not?". And to answer this question, non-black objects are taken. For example, red apples. And, by each such apple, the thesis that "all ravens are black" is confirmed, because apples are not black and, at the same time, they are not ravens. There is something wrong with logic, isn't there?
The TDD adept, just like in the Raven Paradox, often thinks a test crash on the obviously incorrect code can be a say something about whether the test will crash on the code that looks like it is correct. However, there is no any relation. It is just two different codes.
The breaking and fixing of the code is nothing more than a senseless act that is needed formally passing the 2 compulsory steps of the ritual cycle. But how likely is this green situation?
Initially green tests are unavoidable
You will not have enough of one test, even for the simplest function. After all, you should consider positive and negative scenarios, boundary values, equivalence classes. You will be able to write the first red test, the second, the third by using TDD, but very quickly you will face the situation when you have already written the code, which satisfies all the test cases. However, you have written even less than half of the total number of the tests. And this situation is inevitable.
❌ ⇝ ✅
❌ ⇝ ✅
❌ ⇝ ✅
✅ ❓
✅ ❓
✅ ❓
✅ ❓
✅ ❓
If we leave such tests, it will not be TDD, because we wrote the biggest part of the tests after we had written the code, and not before. If we delete them, the code will remain simply untested. And at the next refactoring, we are likely to allow a defect, that will not be detected due to lack of the test for the appropriate case.
In other words, we are forced to explicitly violate the main idea of TDD: the first is the test, then the code, for the quality assurance.
Correct TDD
Nevertheless, let's try to imagine how can the TDD of the Chad Thundercock look like...
The first question we should ask "Do we need one more test?". If we have not filled yet all the test cases with tests, then we need this. And the next step is writing a test. Then we check whether it passes. And if it passes, then we return to the original point. If the test does not pass, it means that the test and the implementation do not conform to each other and we should fix it. The fixing is the correction of the code or the test. The problem can be both, the code and in the test.
We run the tests again after making changes. And if everything is green, then we return to the beginning of the cycle. And only when we have filled all the cases with tests and we do not need more of them, only then we start refactoring. If during the refactoring process the tests start to crash, we should return to the fixing stage.
And, finally, pay attention that even after refactoring we ask the question "Do we need one more test?". But how is that, - you may ask, - we have already filled all the test cases. The reason is refactoring can lead to a significant change of the code. And this case can lead to changes in boundary values, which may require additional tests.
We can use TDD in such a form usefully. However...
TDD leads to a lot of extra work
We are suggested even to do not try to write a full-featured implementation, and limit ourselves to only a minimal implementation what is enough for passing the next test. Therefore, we will often write obviously the incorrect code, which will being put in the trash on the next iteration.
Let's see a typical scenario of writing a simple function...
Iteration
At the beginning
In the process
As a result
1
❌
❌
✅
2
✅❌
❌❌
✅✅
3
✅✅❌
❌❌❌
✅✅✅
4
✅✅✅❌
✅✅❌❌
✅✅✅✅
5
✅✅✅✅❌
✅✅✅✅❌
✅✅✅✅✅
6
✅✅✅✅✅❌
❌❌❌❌❌❌
✅✅✅✅✅✅

We throw out the previously written code completely for the first several iterations. And this leads to all tests become red, after that, we should write the code in such a way it passes several tests at once. In other words, we get the situation, as if we immediately have written several tests, and just after that, we started to write the code. And all previous iterations did not make any sense.
But, all is not so bad. We will stop to throw out the code from the some moment completely, and the adding a new test will not lead to significant rewriting of the code. That is, the TDD cycle will start working as it was intended.
However, there is still a high chance that we can face the situation at some moment when the next change of the code will break all tests at all. Well, or it will break at least most of them. It means that we come back to the situation, when "all the tests already have written, and we just need to write the code correctly". And, all those cautious steps on one test, which we had made earlier, just lose importance.
When TDD is useful
As previously noted, the use of TDD is generally more useless than useful. However, in some cases, it may be well-taken...
✅ Fixing defects
✅ Know in advance contract
✅ You can not bring yourself to write tests
If you got a bug, the first is you can formalize it in the form of a text, and the second is to fix the code until all the tests will turn green.
Also, in the situation when you know the contract in advance, you can immediately write all the tests, and then the code, which conforms to them. Formally, it will not be TDD, because you will not change the code after the adding every test. However, this is true Test Driven, because the implementation will be dictated by tests.
Finally, the use of TDD can help you with your self-discipline and force you to write tests.  But, if you have a problem with your self-discipline, it will be not so easy to force you to use TDD, maybe. However, here faith can work wonders.
Should I program by using TDD?
If somebody tells you that he "programs by using TDD", then you can be sure, that he simply does not understand what he does. We can see the number of TDD main problems, so its use is well taken only in a very limited number of cases. And then, we can use TDD not in such form, which we are taught by many coaches as a rule.
Ritualization
Obviously the incorrect code
Needless work
✅ Where it is appropriate
✅ Do not get hung up
Followers of TDD, propagandizing it, often compare development by TDD to non-tests development. And, that is, of course, not correct. You undoubtedly need to use test automation, if you want to ensure a good level of quality, because manual testing due to the human factor inevitably misses defects. However, you should not identify test automation and TDD. TDD is quite concrete ritual of test automation. But automatic tests can be written without any ritualization. You just should start to be rational and write them as it is needed and when it is needed.
What information else can you read about TDD?
If you have read this article, but the information was not enough, you can read the following speeches, where speakers review the TDD issues from other sides...
Егор Бугаенко — TDD вверх ногами.
TDD: когда нужно и, самое главное, когда не нужно / Павел Калашников.
Dependency Rejection and TDD without Mocks. Anton Moldovan
Deconstructing of the LSP
In 1987, Barbara Liskov has formulated the principle of developing and given it her name.
Liskov Substitution Principle
This principle allows understanding whether you have written the polymorphic code correctly or not. However, before we will formulate it, we should to understand some concepts, which are included in the definition...
"Supertype-subtype" relation
All data in our program belongs to one type or another. A type defines a set of possible values and their semantics. One type can completely include the other. In this case, the second type is a subtype of the first type. In this way, the types can form a hierarchy. Let's review an example with numbers...
Both the type of integers and the type of positive numbers separately are special cases of the type of real numbers, and it means that they are its subtypes. At the same time, integers do not include all positive numbers. And the positive numbers do not include all the integers. Therefore, these types are not in the "supertype-subtype" relation. But natural numbers are both integers and positive numbers, so this type of natural numbers is a subtype of both types.
The "supertype-subtype" relation is transitive, in other words, if one type is a subtype of another, and the other type is a subtype of the third, then the first type is a subtype of the third type.
Strong and weak typing
Here, however, we need to keep in mind the specificity of the representation of values of the different types in memory. For example, the equivalent values of the integers and real numbers types are usually represented by a different sequence of bits. So, these types will not be related in some languages. However, there are languages by which values can be automatically convert from one representation to another. There the narrower type is a subtype of the wider type, which allows to hold a large number of variants of values.
On the illustration, we see the system of numerical types in the weakly typed language, which can implicitly make a type conversion, if it does not lead to loss of information.
Polymorphism
Polymorphism is the ability of the same code to work with arguments of different types.
In the example given, the draw procedure takes a brushed shape as input. And it does not matter what shape we transfer it, the procedure will draw it anyway.
The essence of LSP is ubiquitous covariance.
Finally, we now can formulate Barbara Liskov Substitution Principle: "Any functions, which use a base type, must be able to use subtypes of the base type without knowing about it and without violating the desired properties of the program."
For example, if a function takes a pet as input, then we can transfer it a cat, a dog, but you can not transfer a wild fox. In modern language, the LSP states: all parameters of all functions must be covariant, in other words, they must limit the relative declared type tree from above for this parameter.
It sounds logical, but...
Contravariance does not join the LSP
Let's review the function that takes a box for a pet as input and puts some unknown pet into it.
If we allow to transfer into it a cage for dogs, then we can face an absurd situation, when we take out a seemingly dog from a cage and say "fetch!", but it will mew and pee in your slippers. In other words, it is not allowed to transfer a subtype into this function. But it is possible to give the supertype because you can put into a box both a domestic and a wild animal. It is a kind of the LSP inversion. It means, that the hierarchy of types is limited not from above, but from below. This constraint is called "contravariance".
Types of variances
We can see, that the possibility of substitution of one type instead of another type depends on the type of the parameter not so much, as what the function makes with this parameter. And the different constraints can be here...
Read-only - covariance(upper constraint)
Write-only - contravariance (lower constraint)
Reading and writing:
invariance (lower and upper constraint)
bivariance (without constraints)
That is, if we want to write the correct programs, then we are obviously forced to break LSP in many cases.
The LSP Applicability
All these different variances appear only when we change a state. But if we work just with pure functions, which change nothing, then we automatically get covariance of all parameters and, as consequence, the LSP. Whether we want it or not - it does not depend on us.
✅ Functional programming
On the other hand, any useful functional program contains not only a clean part but and a dirty part, where serious questions related to variance appear.
The correct LSP
Okay, let's dream and try to formulate the LSP, taking into account all the voiced earlier nuances...
✅ Static typing
"The function may not know the specific transferred to it type, but it must constrain quantity of transferred types in such way it will be impossible to give to her a such type, which will break the expected behavior of the program".
On the one hand, it still sounds such fuzzy, as the original statement, and on the other hand - self-evident. It is clear that if it is possible to write the types correctly, then it is worth doing it correctly.
Should I follow the LSP?
As I have showed earlier, if we want to write the programs correctly, we can not follow the LSP. Because it is a principle, and, for example, it is not a pattern. We should either adhere to a principle in everything or adhere to something other, that only sometimes conform to that principle. The principle can not be partially adhered to, just as you can not be a little pregnant.
The LSP is an outdated concept at the present day, that does not take into account many cases. Therefore, it should not be used as a guide to action in any case. And it is important to understand the variance of your parameters, and how the particular programming language works with types.
❌ LSP ✅ Variance
What else can I read about variance?
I recommend my article on this topic for a better understanding of the variance issue. There I speak clearly about this difficult theory and give examples of the code in various programming languages, showing different types of variance.
Programming Theory: Variance
Unfortunately, in modern languages, support for variance is in its infancy. Somewhere it is not supported at all. Somewhere the variances are hard-coded. Somewhere are limited mechanisms for explicitly specifying the variance. We can meet not only the automatic output of parameters in very rare languages but also the output of their variance, which is very cool because the hand output of variance is sometimes too verbose.
Deconstructing of SOLID
❌ SRP ❌ OCP ❌ LSP ❌ ISP ❌ DIP
What else can I read about SOLID?
When should not you use SOLID?
To be continued...
✅ Like ✅ Subscription ✅ Comment ✅ Share
If my analysis was useful for you, please, let me know about it by like and share the link to it with your colleagues. Especially with those who work with OOP, adhering to the LSP.
If you do not agree with any idea or you feel some understatement and want to add your own ideas, then I wait for your comments.
If you are not afraid to discuss with me live or you even ready to become my co-author of future articles, then write telegrams.
Finally, subscribe to the channel, so that you do not miss my further analyses. We still have a lot to discuss with you.
That is all for now. It was the combat programmer - Dmitry Karlovsky.
