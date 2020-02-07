# README
# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, unique: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups, though: :users_groups
- has_many :users_groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, through: :users_groups
- has_many :users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|
### Association
- belongs_to :user
- belongs_to :group
