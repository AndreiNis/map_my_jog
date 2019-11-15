# == Schema Information
#
# Table name: routes
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  polyline   :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
    validates :distance, :name, :polyline, :user_id, presence: true

    belongs_to :user
    has_many :comments
end
