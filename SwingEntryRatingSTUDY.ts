# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# RSI
def NETCHGAVG = WildersAverage(close - close[1], 14);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), 14);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

# OSCILLATOR TEST
def GREENPRICE = MACD >= 0 and FASTLINE >= SLOWLINE;
def REDPRICE = MACD < 0 and FASTLINE < SLOWLINE;

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot RATING =

# BULL =
if
((SMA200 and !SMA20 and RSI[1] <= 50
and RelativeVolume >= 1.0) # TL SUPPORT
or (!SMA200 and !SMA20 and RSI[1] <= 50
and RelativeVolume >= 1.25)) # OVERSOLD
and close > OHLC4[1]
and close > close[1]
then 1

else if
((!SMA200 and SMA20 and RSI[1] >= 50
and RelativeVolume >= 1.25) # TL SUPPORT
or (SMA200 and SMA20 and RSI[1] >= 50
and RelativeVolume >= 1.5)) # OVERBOUGHT
and close < OHLC4[1]
and close < close[1]
then -1

else 0;