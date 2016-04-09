# -*- coding: utf-8 -*-
# sudo pip install qiniu
# sudo pip install python-magic
from qiniu import (
    Auth, BucketManager, put_file, urlsafe_base64_decode,
    build_batch_delete
)

QINIU_DOMAIN = 'http://7xpmif.com2.z0.glb.qiniucdn.com/'
EXPIRE_TIME = 365 * 24 * 3600   # 1 year

Q = Auth('sVc1BlAXhHDHYHJ7gjW4VD6iqP5zo7iC2pf9c3n8', 'Cixqb8jq6esZjzhHonc8OkFY3mGIIAQlOK08DCm0')


def get_token(bucket='lucky-web'):
    token = Q.upload_token(bucket, expires=EXPIRE_TIME)
    return token


def delete_data(urls, bucket='lucky-web', key_prefix=''):
    keys = []
    for url in urls:
        if not url.endswith('/'):
            url += '/'
        key = url.split('/')[-2]
        if key_prefix:
            key = '%s/%s' % (key_prefix, key)
        keys.append(key)

    ops = build_batch_delete(bucket, keys)
    b = BucketManager(Q)
    ret, info = b.batch(ops)


def upload_file(file_name, file_path, bucket='lucky-web', key_prefix='', mime_type='text/plain'):
    token = get_token(bucket)
    if key_prefix and not key_prefix.endswith('/'):
        key_prefix += '/'
    key = '%s%s' % (key_prefix, file_name)

    #b = BucketManager(Q)
    #b.delete(bucket, key)

    ret, info = put_file(token, key, file_path, mime_type=mime_type, check_crc=False)
    if not ret or ret.get('key') != key:
        print 'fail to upload image, info: %s' % info

    return QINIU_DOMAIN + key

if __name__ == '__main__':
    import os
    import magic
    import base64
    file_dir = os.path.dirname(os.path.realpath(__file__)).replace('lib', 'build/')

    for root, dirs, files in os.walk(file_dir):
        key_prefix = root.replace(file_dir, '')
        for file_name in files:
            if file_name == 'index.html':
                continue
            file_path = os.path.join(root, file_name)
            mime_type = magic.from_file(file_path, mime=True)
            if file_name.endswith('.css') or file_name.endswith('.css.map'):
                mime_type = 'text/css'
            elif file_name.endswith('.js'):
                mime_type = 'application/x-javascript'

            print 'key_prefix: %s, current file name: %s, file path: %s, mime_type: %s' % (key_prefix, file_name, file_path, mime_type)
            upload_file(file_name, file_path, key_prefix=key_prefix, mime_type=mime_type)

