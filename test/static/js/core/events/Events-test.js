define(['core/events/Events'], function(Events) {

    describe('test/js/core/events/Events-test.js', function() {

        it('should initialize', function() {
            var events = new Events();
            expect(events).to.be.ok();

            expect(events.addListener).to.be.a('function');
            expect(events.addListeners).to.be.a('function');
            expect(events.dispatch).to.be.a('function');
        });

        describe('addListener() and dispatch()', function() {
            var events;
            beforeEach(function() {
                events = new Events();
            });

            it('should invoke listener with dispatch()', function() {
                var called = false;

                events.addListener('my event', function(test) {
                    called = true;
                });

                events.dispatch('my event');

                expect(called).to.be(true);
            });

            it('should invoke multiple listeners with dispatch()', function() {
                var args, count = 0;

                function callback() {
                    args = [].slice.call(arguments);
                    count++;
                }

                events.addListener('my event', callback);
                events.addListener('my event', callback);

                events.dispatch('my event', 1, 2);

                expect(count).to.be(2);
                expect(args[0]).to.be(1);
                expect(args[1]).to.be(2);
            });

            it('should invoke listener with specific context', function() {
                var context = {};

                events.addListener('my event', function(arg) {
                    this.value = arg;
                }, context);

                events.dispatch('my event', 123);

                expect(context.value).to.be(123);
            });
        });

        describe('addListener() and dispatch()', function() {
            var events, context;
            beforeEach(function() {
                events = new Events();
                context = {
                    firstEventCount: 0,
                    secondEventCount: 0
                };
            });
            it('should add multiple listeners with same context', function() {
                events.addListeners({
                    'first event': function() {
                        this.firstEventCount++;
                    },
                    'second event': function() {
                        this.secondEventCount++;
                    }
                }, context);

                events.dispatch('first event');
                expect(context.firstEventCount).to.be(1);
                expect(context.secondEventCount).to.be(0);

                events.dispatch('second event');
                expect(context.firstEventCount).to.be(1);
                expect(context.secondEventCount).to.be(1);
            });
        });

        describe('removeListener()', function() {
            var events, context;
            beforeEach(function() {
                events = new Events();
                context = {
                    called: false
                };
            });

            it('should be able to remove listener', function() {
                function callback() {
                    this.called = true;
                }

                events.addListener('my event', callback, context);

                events.removeListener('my event', callback);

                events.dispatch('my event');
                expect(context.called).to.be(false);
            });
        });

        describe('removeAllListeners()', function() {
            var events, context1, context2;
            beforeEach(function() {
                events = new Events();
                context1 = {};
                context2 = {};

                events.addListeners({
                    'event1': function() {
                        this.event1 = true;
                    },
                    'event2': function() {
                        this.event2 = true;
                    },
                }, context1);

                events.addListeners({
                    'event1': function() {
                        this.event1 = true;
                    },
                    'event2': function() {
                        this.event2 = true;
                    }
                }, context2);

                events.addListener('event1', function() {
                    this.event1 = true;
                }, context1);
            });

            it('should be able to remove listeners with context', function() {
                events.removeAllListeners(context1);

                events.dispatch('event1', function() {
                    expect(context1.event1).to.not.be.ok();
                    expect(context2.event1).to.be(true);
                });

                events.dispatch('event2', function() {
                    expect(context1.event2).to.not.be.ok();
                    expect(context2.event2).to.be(true);
                });
            });
        });

    });

});