CREATE TABLE charityInfo(
    id int,
    EIN int,

    TOTAL_REVENUE double,
    TOTAL_EXPENSE double,
    
    PRGM_SERVICE double,
    OVERHEAD_COST double,
    RATIO double,

    charityName varchar(1000),
    city varchar(100),
    state varchar(10)
);

LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/nonProfitFull.csv' INTO TABLE charityInfo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
