-- ��ȡ��Ʒ����ҳ���⣬ͼ�Ľ�����Ϣ��
SELECT * FROM dt_article da WHERE da.channel_id = 7 AND da.title LIKE '%�¿�%';
SELECT * FROM dt_article da WHERE da.id = 101;
-- ��ȡ��Ʒ����ҳ�еĹ���ͼƬ
select * FROM dt_article_albums daa WHERE daa.article_id = 87;

-- ��ȡ��Ʒ����������Ϣ
SELECT daav.goods_no,daav.stock_quantity FROM dt_article_attribute_value daav  WHERE daav.article_id =101;
SELECT * FROM dt_article_attribute_value daav  WHERE daav.article_id =87;

-- ��ƷƷ��
select * from dt_article_comment dac WHERE dac.article_id=101;


  SELECT count(distinct tb1.id) AS idcount, tb1.* FROM (
SELECT  da.id,da.title,daa.sell_price,alb.thumb_path
  FROM dt_article da 
  LEFT JOIN dt_article_attribute_value daa ON (da.id = daa.article_id)
  LEFT JOIN dt_article_albums alb ON (da.id = alb.article_id)
WHERE  da.id IN( 87,101,88,89) ) AS tb1 GROUP BY tb1.id
